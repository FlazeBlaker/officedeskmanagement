import React, { useState, useEffect } from 'react';
import './ProfilePage.css';

function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            // Get the token from localStorage
            const token = localStorage.getItem('authToken');

            if (!token) {
                setError('You must be logged in to view this page.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('http://localhost:3001/api/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // Include the token in the Authorization header
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch profile data. Please log in again.');
                }

                const data = await response.json();
                setProfile(data);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []); // The empty array ensures this effect runs only once

    if (loading) {
        return <div className="profile-container"><div className="loader"></div></div>;
    }

    if (error) {
        return <div className="profile-container"><p className="error-message">{error}</p></div>;
    }

    return (
        <main className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <img src={profile.avatar_url} alt={`${profile.name}'s avatar`} className="profile-avatar" />
                    <h1 className="profile-name">{profile.name}</h1>
                    <p className="profile-email">{profile.email}</p>
                </div>
                <div className="profile-body">
                    <h2>About Me</h2>
                    <p className="profile-bio">{profile.bio}</p>
                </div>
                <div className="profile-footer">
                    <button className="btn btn-secondary">Edit Profile</button>
                    <button className="btn btn-primary">My Bookings</button>
                </div>
            </div>
        </main>
    );
}

export default ProfilePage;