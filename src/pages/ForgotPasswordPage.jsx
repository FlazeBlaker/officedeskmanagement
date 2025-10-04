import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await fetch('http://localhost:3001/api/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, newPassword }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to reset password');
            }
            setMessage(data.message);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form-wrapper">
                <div className="auth-header">
                    <Link to="/" className="auth-logo">Co.Work</Link>
                    <h1 className="auth-title">Reset Your Password</h1>
                    <p className="auth-subtitle">Enter your email and a new password.</p>
                </div>

                {message ? (
                    <p className="auth-success">{message}</p>
                ) : (
                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder=" " />
                            <label htmlFor="email">Your Email Address</label>
                        </div>
                        <div className="form-group">
                            <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required placeholder=" " />
                            <label htmlFor="newPassword">New Password</label>
                        </div>
                        {error && <p className="auth-error">{error}</p>}
                        <button type="submit" className="btn btn-primary btn-full">Reset Password</button>
                    </form>
                )}

                <div className="auth-footer">
                    <Link to="/login" className="auth-link">Back to Log In</Link>
                </div>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;