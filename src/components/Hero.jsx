// Hero.jsx

import React from 'react';
import './Hero.css';
import { Link } from 'react-router-dom';

function Hero() {
    return (
        <section className="hero-section">
            <div className="hero-content">
                {/* --- REMOVE THE SPAN AROUND "Ambition" --- */}
                <h1 className="hero-title">
                    Where Ambition Meets Opportunity.
                </h1>

                <p className="hero-subtitle">
                    Experience the future of work, risk-free. Sign up now and get a complimentary day pass to explore our amenities and vibrant community.
                </p>

                <Link to="/book-trial" className="btn btn-primary">Start Your Free Plan Today</Link>
            </div>
            <div className="hero-image-container">
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" alt="A modern, collaborative workspace" className="hero-image" />
            </div>
        </section>
    );
}

export default Hero;