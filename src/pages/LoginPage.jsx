import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to login');
            }

            // --- THIS IS THE DEBUGGING LINE ---
            console.log('Server response on successful login:', data);

            login(data.token);
            navigate('/profile');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form-wrapper">
                <div className="auth-header">
                    <Link to="/" className="auth-logo">Co.Work</Link>
                    <h1 className="auth-title">Welcome Back</h1>
                    <p className="auth-subtitle">Log in to access your dashboard and bookings.</p>
                </div>
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder=" " />
                        <label htmlFor="email">Email Address</label>
                    </div>
                    <div className="form-group">
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder=" " />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="auth-options">
                        <Link to="/forgot-password" className="auth-link">Forgot Password?</Link>
                    </div>
                    {error && <p className="auth-error">{error}</p>}
                    <button type="submit" className="btn btn-primary btn-full">Log In</button>
                </form>
                <div className="auth-footer">
                    <p>Don't have an account? <Link to="/register" className="auth-link">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;