import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">The Future of Work is Flexible.</h1>
        <p className="hero-subtitle">Discover Pune's most advanced co-working space, designed for productivity and connection. Book your desk in seconds.</p>
        <a href="#pricing" className="btn btn-hero">Explore Plans</a>
      </div>
    </section>
  );
}

export default Hero;