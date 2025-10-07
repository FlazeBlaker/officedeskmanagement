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

    // 👇 ADD THESE TWO LOGS FOR DEBUGGING
    console.log("--------------------");
    console.log("Verifying token:", token);
    console.log("Using JWT_SECRET:", process.env.JWT_SECRET); 
    console.log("--------------------");

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

// NEW: Endpoint to update a user's profile (name and bio)
app.put('/api/profile', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, bio } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Name cannot be empty.' });
        }

        const sql = 'UPDATE users SET name = ?, bio = ? WHERE id = ?';
        await db.query(sql, [name, bio, userId]);
        res.status(200).json({ message: 'Profile updated successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Database or server error.' });
    }
});

// --- BOOKING & PLAN ROUTES ---
// NEW: Endpoint to get a user's past bookings
app.get('/api/my-bookings', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        // This query joins bookings with resources to get more details
        const sql = `
            SELECT b.booking_date, r.zone, r.type
            FROM bookings b
            JOIN resources r ON b.resource_id = r.id
            JOIN users u ON b.user_email = u.email
            WHERE u.id = ?
            ORDER BY b.booking_date DESC
        `;
        const [bookings] = await db.query(sql, [userId]);
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings.' });
    }
});

// NEW: Endpoint to get a user's most recent active plan
app.get('/api/my-plan', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        // Gets the most recent purchase for the user
        const sql = 'SELECT plan_name, purchase_date FROM plan_purchases WHERE user_id = ? ORDER BY purchase_date DESC LIMIT 1';
        const [results] = await db.query(sql, [userId]);
        if (results.length === 0) {
            // It's not an error to have no plan, just send a default
            return res.status(200).json({ plan_name: 'No Active Plan' });
        }
        res.status(200).json(results[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching active plan.' });
    }
});

app.post('/api/purchases', authenticateToken, async (req, res) => {
    // Get the logged-in user's ID from the JWT middleware
    const userId = req.user.id;
    const { planName, planPrice } = req.body;

    if (!planName || !planPrice) {
        return res.status(400).json({ message: 'Plan details are required.' });
    }

    try {
        // Convert price string (e.g., "₹12,999") to a number
        const amountPaid = parseFloat(planPrice.replace(/[^\d.]/g, ''));

        const sql = 'INSERT INTO plan_purchases (user_id, plan_name, amount_paid) VALUES (?, ?, ?)';
        const [result] = await db.query(sql, [userId, planName, amountPaid]);

        res.status(201).json({ message: 'Purchase recorded successfully!', purchaseId: result.insertId });
    } catch (error) {
        console.error("Purchase recording error:", error);
        res.status(500).json({ message: 'Failed to record purchase.' });
    }
});

app.post('/api/subscribe', authenticateToken, async (req, res) => {
    const { planName, planPrice } = req.body;
    const userId = req.user.id; // We get the user ID from the authenticated token

    if (!planName || !planPrice) {
        return res.status(400).json({ message: 'Plan details are required.' });
    }

    try {
        const sql = "INSERT INTO user_plans (user_id, plan_name, plan_price) VALUES (?, ?, ?)";
        // Convert price string like '₹999' to a number 999
        const priceNumber = parseFloat(planPrice.replace(/[^0-9.-]+/g, "")); 
        
        await db.query(sql, [userId, planName, priceNumber]);
        res.status(201).json({ message: 'Plan activated successfully!' });
    } catch (error) {
        console.error("Error activating plan:", error);
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
        // 👇 ADD THIS LINE TO FIX THE DATE FORMAT
        const bookingDate = new Date(date).toISOString().slice(0, 10);

        // Use the new 'bookingDate' variable in the query
        const bookedQuery = "SELECT resource_id FROM bookings WHERE booking_date = ?";
        const [bookedRows] = await db.query(bookedQuery, [bookingDate]); // 👈 USE THE CORRECTED DATE HERE
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
        // Add a console.log here to help with future debugging!
        console.error("Error in /api/resources:", error); 
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