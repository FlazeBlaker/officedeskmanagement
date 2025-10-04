import React from 'react';
import './Pricing.css';

function Pricing() {
  return (
    <section id="pricing" className="section">
      <h2 className="section-title">Find a Plan That's Right For You</h2>
      <p className="section-subtitle">Simple, transparent pricing for individuals and teams. Join our community today.</p>
      <div className="pricing-grid">
        <div className="pricing-card">
          <h3 className="plan-name">Day Pass</h3>
          <p className="plan-price">₹799 <span className="plan-duration">/ day</span></p>
          <ul className="plan-features">
            <li>High-speed Wi-Fi</li>
            <li>Access to common areas</li>
            <li>Unlimited coffee & tea</li>
            <li>Perfect for a trial run</li>
          </ul>
          <a href="#" className="btn btn-secondary btn-full">Choose Plan</a>
        </div>
        
        <div className="pricing-card popular">
          <div className="popular-badge">Most Popular</div>
          <h3 className="plan-name">Monthly Flex</h3>
          <p className="plan-price">₹12,999 <span className="plan-duration">/ month</span></p>
          <ul className="plan-features">
            <li>All Day Pass features</li>
            <li>Book any available desk</li>
            <li>4 hours of meeting room credits</li>
            <li>Access to community events</li>
          </ul>
          <a href="#" className="btn btn-primary btn-full">Choose Plan</a>
        </div>

        <div className="pricing-card">
          <h3 className="plan-name">Private Office</h3>
          <p className="plan-price">Contact Us</p>
          <ul className="plan-features">
            <li>Dedicated, lockable office</li>
            <li>For teams of 2-10 people</li>
            <li>24/7 access</li>
            <li>All-inclusive amenities</li>
          </ul>
          <a href="#" className="btn btn-secondary btn-full">Get a Quote</a>
        </div>
      </div>
    </section>
  );
}

export default Pricing;