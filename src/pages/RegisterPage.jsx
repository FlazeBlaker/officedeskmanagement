import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:3001/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to register');
            }
            alert('Registration successful! Please log in.');
            navigate('/login');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form-wrapper">
                <div className="auth-header">
                    <Link to="/" className="auth-logo">Co.Work</Link>
                    <h1 className="auth-title">Create Your Account</h1>
                    <p className="auth-subtitle">Join our community and start your free trial.</p>
                </div>
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder=" " />
                        <label htmlFor="name">Full Name</label>
                    </div>
                    <div className="form-group">
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder=" " />
                        <label htmlFor="email">Email Address</label>
                    </div>
                    <div className="form-group">
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder=" " />
                        <label htmlFor="password">Password</label>
                    </div>
                    {error && <p className="auth-error">{error}</p>}
                    <button type="submit" className="btn btn-primary btn-full">Create Account</button>
                </form>
                <div className="auth-footer">
                    <p>Already have an account? <Link to="/login" className="auth-link">Log In</Link></p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;