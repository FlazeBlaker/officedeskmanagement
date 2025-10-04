const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3001;
const saltRounds = 10;
const JWT_SECRET = 'your-super-secret-key-that-is-long-and-random';

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- MYSQL CONNECTION ---
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Leo@1205',
    database: 'officedeskmanagement'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database! 🎉');
});

// --- JWT AUTHENTICATION MIDDLEWARE ---
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token == null) {
        return res.sendStatus(401); // Unauthorized if no token
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden if token is invalid
        }
        req.user = user; // Attach user payload to the request object
        next(); // Proceed to the route handler
    });
};

// --- API ROUTES ---

// POST /api/register
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    try {
        const password_hash = await bcrypt.hash(password, saltRounds);
        const sql = "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)";
        db.query(sql, [name, email, password_hash], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ message: 'Email already exists.' });
                return res.status(500).json({ message: 'Database error.' });
            }
            res.status(201).json({ message: 'User registered successfully!' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
});

// POST /api/login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error.' });
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
    });
});

// POST /api/reset-password
app.post('/api/reset-password', async (req, res) => {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) return res.status(400).json({ message: 'Email and new password are required.' });
    const password_hash = await bcrypt.hash(newPassword, saltRounds);
    const sql = "UPDATE users SET password_hash = ? WHERE email = ?";
    db.query(sql, [password_hash, email], (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error.' });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'User with that email not found.' });
        res.status(200).json({ message: 'Password has been reset successfully.' });
    });
});

// GET /api/profile (Protected and Dynamic)
app.get('/api/profile', authenticateToken, (req, res) => {
    // We get the user's ID from the token middleware
    const userId = req.user.id;

    const sql = 'SELECT id, name, email, bio, avatar_url FROM users WHERE id = ?';
    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (results.length === 0) return res.status(404).json({ error: 'User not found' });
        res.json(results[0]);
    });
});

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});