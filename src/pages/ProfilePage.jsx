import React, { useState, useEffect } from 'react';
import './ProfilePage.css';

function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [activePlan, setActivePlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for editing mode
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ name: '', bio: '' });

    // Fetches all user data (profile, bookings, plan)
    useEffect(() => {
        const fetchAllData = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                setError('You must be logged in to view this page.');
                setLoading(false);
                return;
            }

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };

            try {
                // Fetch all data in parallel for better performance
                const [profileRes, bookingsRes, planRes] = await Promise.all([
                    fetch('http://localhost:3001/api/profile', { headers }),
                    fetch('http://localhost:3001/api/my-bookings', { headers }),
                    fetch('http://localhost:3001/api/my-plan', { headers })
                ]);

                if (!profileRes.ok || !bookingsRes.ok || !planRes.ok) {
                    throw new Error('Failed to fetch your data. Please log in again.');
                }

                const profileData = await profileRes.json();
                const bookingsData = await bookingsRes.json();
                const planData = await planRes.json();

                setProfile(profileData);
                setBookings(bookingsData);
                setActivePlan(planData);
                setEditData({ name: profileData.name, bio: profileData.bio || '' });

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await fetch('http://localhost:3001/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(editData)
            });
            if (!response.ok) throw new Error('Failed to save profile.');

            // Update the local profile state with the new data
            setProfile(prev => ({ ...prev, name: editData.name, bio: editData.bio }));
            setIsEditing(false); // Exit editing mode
        } catch (err) {
            setError(err.message);
        }
    };

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
                    {isEditing ? (
                        <input
                            type="text"
                            name="name"
                            value={editData.name}
                            onChange={handleEditChange}
                            className="profile-name-edit"
                        />
                    ) : (
                        <h1 className="profile-name">{profile.name}</h1>
                    )}
                    <p className="profile-email">{profile.email}</p>
                </div>

                {/* --- BIO & ACTIVE PLAN SECTION --- */}
                <div className="profile-body">
                    <div className="profile-section">
                        <h2>About Me</h2>
                        {isEditing ? (
                            <textarea
                                name="bio"
                                value={editData.bio}
                                onChange={handleEditChange}
                                className="profile-bio-edit"
                                placeholder="Tell us a bit about yourself..."
                            />
                        ) : (
                            <p className={`profile-bio ${!profile.bio ? 'empty' : ''}`}>
                                {profile.bio || 'You haven\'t added a bio yet. Click Edit Profile to add one!'}
                            </p>
                        )}
                    </div>

                    <div className="profile-section">
                        <h2>Active Plan</h2>
                        <div className="active-plan-card">
                            <span className="plan-name">{activePlan?.plan_name}</span>
                            {activePlan?.purchase_date && (
                                <span className="plan-date">
                                    Member since: {new Date(activePlan.purchase_date).toLocaleDateString()}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- MY BOOKINGS SECTION --- */}
                <div className="bookings-section">
                    <h2>My Bookings</h2>
                    <div className="bookings-list">
                        {bookings.length > 0 ? (
                            bookings.map((booking, index) => (
                                <div key={index} className="booking-item">
                                    <span className="booking-date">{new Date(booking.booking_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                    <span className="booking-details">{booking.zone} ({booking.type.replace('_', ' ')})</span>
                                </div>
                            ))
                        ) : (
                            <p className="no-bookings">You have no past or upcoming bookings.</p>
                        )}
                    </div>
                </div>

                <div className="profile-footer">
                    {isEditing ? (
                        <>
                            <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
                        </>
                    ) : (
                        <button className="btn btn-secondary" onClick={() => setIsEditing(true)}>Edit Profile</button>
                    )}
                </div>
            </div>
        </main>
    );
}

export default ProfilePage;