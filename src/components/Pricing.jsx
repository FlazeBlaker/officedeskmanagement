import React from 'react';
import './Pricing.css';

// NEW: A reusable card component to handle the animation logic
const PricingCard = ({ children, className = '' }) => {
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div className={`pricing-card ${className}`} onMouseMove={handleMouseMove}>
      {children}
    </div>
  );
};

function Pricing() {
  return (
    <section id="pricing" className="section">
      <h2 className="section-title">Find a Plan That's Right For You</h2>
      <p className="section-subtitle">Simple, transparent pricing for individuals and teams. Start with our no-commitment free trial.</p>
      <div className="pricing-grid">
        
        <PricingCard>
          <h3 className="plan-name">Free Trial</h3>
          <p className="plan-price">₹0 <span className="plan-duration">/ one day</span></p>
          <ul className="plan-features">
            <li>High-speed Wi-Fi</li>
            <li>Access to common areas</li>
            <li>Unlimited coffee & tea</li>
            <li>Experience the community</li>
          </ul>
          <a href="#" className="btn btn-secondary btn-full">Start Free Trial</a>
        </PricingCard>

        <PricingCard>
          <h3 className="plan-name">Day Pass</h3>
          <p className="plan-price">₹799 <span className="plan-duration">/ day</span></p>
          <ul className="plan-features">
            <li>All Free Trial features</li>
            <li>Guaranteed desk space</li>
            <li>Access to phone booths</li>
            <li>Perfect for a single day</li>
          </ul>
          <a href="#" className="btn btn-secondary btn-full">Choose Plan</a>
        </PricingCard>
        
        <PricingCard className="popular">
          <div className="popular-badge">Most Popular</div>
          <h3 className="plan-name">Monthly Flex</h3>
          <p className="plan-price">₹12,999 <span className="plan-duration">/ month</span></p>
          <ul className="plan-features">
            <li>All Day Pass features</li>
            <li>4 hours of meeting room credits</li>
            <li>Access to community events</li>
            <li>Mail & package handling</li>
          </ul>
          <a href="#" className="btn btn-primary btn-full">Choose Plan</a>
        </PricingCard>

        <PricingCard>
          <h3 className="plan-name">Private Office</h3>
          <p className="plan-price">Contact Us</p>
          <ul className="plan-features">
            <li>Dedicated, lockable office</li>
            <li>For teams of 2-10 people</li>
            <li>24/7 access</li>
            <li>All-inclusive amenities</li>
          </ul>
          <a href="#" className="btn btn-secondary btn-full">Get a Quote</a>
        </PricingCard>

      </div>
    </section>
  );
}

export default Pricing;