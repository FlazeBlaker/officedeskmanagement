import React, { useEffect, useRef, useState } from 'react';
import Tilt from 'react-parallax-tilt'; // Import Tilt
import './Features.css';

// Icons remain the same...
const DeskIcon = () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 17l-1.5-1.5M4 17l1.5-1.5M18 17H6v-2c0-2.2 1.8-4 4-4h4c2.2 0 4 1.8 4 4v2zM15 7V5c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v2"></path></svg>;
const QRIcon = () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 5h3v3H5zM16 5h3v3h-3zM5 16h3v3H5zM16 16h3v3h-3zM10 5h4v4h-4zM10 16h4v4h-4zM5 10h4v4H5zM16 10h4v4h-4z"></path></svg>;
const MeetingRoomIcon = () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12h.01M17 12h.01M7 12h.01M3 21h18M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16"></path></svg>;

function Features() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // useEffect for animations remains the same...
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      }, { threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) { observer.unobserve(ref.current); }
    };
  }, []);

  return (
    <section id="features" className="section">
      <div ref={ref} className={`features-container ${isVisible ? 'is-visible' : ''}`}>
        <h2 className="section-title">A Smarter Way to Work</h2>
        <p className="section-subtitle">Everything you need for a productive day, right at your fingertips. Your work life, simplified.</p>
        <div className="features-grid">
          {/* Wrap each card with Tilt */}
          <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable={true} glareMaxOpacity={0.1} glarePosition="all">
            <div className="feature-card">
              <div className="feature-icon"><DeskIcon /></div>
              <h3 className="feature-title">Instant Desk Booking</h3>
              <p className="feature-description">Find and reserve your favorite desk in seconds from our mobile-friendly app. Your perfect spot is always waiting.</p>
            </div>
          </Tilt>
          <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable={true} glareMaxOpacity={0.1} glarePosition="all">
            <div className="feature-card">
              <div className="feature-icon"><QRIcon /></div>
              <h3 className="feature-title">Seamless QR Code Access</h3>
              <p className="feature-description">No more keycards. Gain secure, keyless entry to the office by scanning a QR code with your phone.</p>
            </div>
          </Tilt>
          <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable={true} glareMaxOpacity={0.1} glarePosition="all">
            <div className="feature-card">
              <div className="feature-icon"><MeetingRoomIcon /></div>
              <h3 className="feature-title">On-Demand Meeting Rooms</h3>
              <p className="feature-description">Need a private space? Book meeting rooms instantly, equipped with everything you need for collaboration.</p>
            </div>
          </Tilt>
        </div>
      </div>
    </section>
  );
}

export default Features;