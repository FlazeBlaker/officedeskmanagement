import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Hero.css';

function Hero() {
    // Get the user's login state from the context and the navigate function
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // This function handles the button click
    const handleFreePlanClick = () => {
        if (user) {
            // If the user is logged in, go to the booking page
            navigate('/book-trial');
        } else {
            // If the user is not logged in, go to the login page
            navigate('/login');
        }
    };

    return (
        <section className="hero-section">
            <div className="hero-content">
                <h1 className="hero-title">
                    Where Ambition Meets Opportunity.
                </h1>

                <p className="hero-subtitle">
                    Experience the future of work, risk-free. Sign up now and get a complimentary day pass to explore our amenities and vibrant community.
                </p>

                {/* The Link is now a button with an onClick handler */}
                <button onClick={handleFreePlanClick} className="btn btn-primary">Start Your Free Plan Today</button>
            </div>
            <div className="hero-image-container">
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto-format=fit-crop" alt="A modern, collaborative workspace" className="hero-image" />
            </div>
        </section>
    );
}

export default Hero;