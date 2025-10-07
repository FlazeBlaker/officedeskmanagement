import React, { useState, useEffect } from 'react';
import './MyBookingsPage.css';

function MyBookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) {
                setError('You must be logged in to view your bookings.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('http://localhost:3001/api/my-bookings', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch bookings.');
                }

                const data = await response.json();
                setBookings(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) {
        return <div className="bookings-page-container"><div className="loader"></div></div>;
    }

    if (error) {
        return <div className="bookings-page-container"><p className="error-message">{error}</p></div>;
    }

    return (
        <main className="bookings-page-container">
            <h1 className="bookings-title">My Bookings</h1>
            {bookings.length > 0 ? (
                <div className="bookings-grid">
                    {bookings.map((booking, index) => (
                        <div key={index} className="booking-card">
                            <div className="booking-card-header">
                                {new Date(booking.booking_date).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </div>
                            <div className="booking-card-body">
                                <p className="booking-card-zone">{booking.zone}</p>
                                <p className="booking-card-type">{booking.type.replace('_', ' ')}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-bookings-message">You have no past or upcoming bookings yet.</p>
            )}
        </main>
    );
}

export default MyBookingsPage;