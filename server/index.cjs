// --- SETUP ---
require('dotenv').config({ path: 'secure.env' }); // Load environment variables from .env file
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
// Use variables from .env file, with fallbacks
const port = process.env.PORT || 3001;
const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
const JWT_SECRET = process.env.JWT_SECRET;

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- MYSQL CONNECTION POOL (IMPROVED & SECURE) ---
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 10
}).promise();



// =================================================================
// --- USER AUTH ROUTES ---
// =================================================================

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    try {
        const password_hash = await bcrypt.hash(password, saltRounds);
        const sql = "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)";
        await db.query(sql, [name, email, password_hash]);
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') return res.status(409).json({ message: 'Email already exists.' });
        res.status(500).json({ message: 'Database or server error.' });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ?";
    try {
        const [results] = await db.query(sql, [email]);
        if (results.length === 0) return res.status(401).json({ message: 'Invalid email or password.' });

        const user = results[0];
        const match = await bcrypt.compare(password, user.password_hash);

        if (match) {
            const tokenPayload = { id: user.id, name: user.name, email: user.email };
            const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1d' });
            res.status(200).json({ message: 'Login successful!', token: token });
        } else {
            res.status(401).json({ message: 'Invalid email or password.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Database or server error.' });
    }
});

app.post('/api/reset-password', async (req, res) => {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) return res.status(400).json({ message: 'Email and new password are required.' });
    try {
        const password_hash = await bcrypt.hash(newPassword, saltRounds);
        const sql = "UPDATE users SET password_hash = ? WHERE email = ?";
        const [result] = await db.query(sql, [password_hash, email]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'User with that email not found.' });
        res.status(200).json({ message: 'Password has been reset successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Database or server error.' });
    }
});

app.get('/api/profile', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const sql = 'SELECT id, name, email, bio, avatar_url FROM users WHERE id = ?';
        const [results] = await db.query(sql, [userId]);
        if (results.length === 0) return res.status(404).json({ error: 'User not found' });
        res.json(results[0]);
    } catch (error) {
        res.status(500).json({ message: 'Database or server error.' });
    }
});

// =================================================================
// --- BOOKING & CONTACT ROUTES ---
// =================================================================

app.get('/api/resources', async (req, res) => {
    const { date, type } = req.query;
    if (!date || !type) return res.status(400).json({ message: 'Date and resource type are required.' });
    try {
        const bookedQuery = "SELECT resource_id FROM bookings WHERE booking_date = ?";
        const [bookedRows] = await db.query(bookedQuery, [date]);
        const bookedIds = bookedRows.map(row => row.resource_id);

        let resourcesQuery = "SELECT * FROM resources WHERE type = ?";
        const params = [type];
        if (bookedIds.length > 0) {
            resourcesQuery += ` AND id NOT IN (?)`;
            params.push(bookedIds);
        }
        const [availableRows] = await db.query(resourcesQuery, params);
        res.status(200).json(availableRows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching resources.' });
    }
});

app.post('/api/bookings', async (req, res) => {
    const { resourceId, date, name, email } = req.body;
    const bookingDate = new Date(date).toISOString().slice(0, 10);
    try {
        const sql = "INSERT INTO bookings (resource_id, booking_date, user_name, user_email) VALUES (?, ?, ?, ?)";
        const [result] = await db.query(sql, [resourceId, bookingDate, name, email]);
        res.status(201).json({ message: 'Booking confirmed!', bookingId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Could not create booking.' });
    }
});

app.post('/api/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
        const sql = 'INSERT INTO contact_inquiries (name, email, subject, message) VALUES (?, ?, ?, ?)';
        const [result] = await db.query(sql, [name, email, subject, message]);
        res.status(201).json({ message: 'Message received successfully!', id: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Failed to save message.' });
    }
});

// --- SERVER START ---
app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});