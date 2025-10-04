import React, { useEffect, useRef, useState } from 'react';
import Tilt from 'react-parallax-tilt';
import './Features.css';

// New, more stylized SVG icons
const DeskIcon = () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 7V19C4 19.5304 4.21071 20.0391 4.58579 20.4142C4.96086 20.7893 5.46957 21 6 21H18C18.5304 21 19.0391 20.7893 19.4142 20.4142C19.7893 20.0391 20 19.5304 20 19V7" stroke="var(--primary-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 7H4L12 3L20 7Z" stroke="var(--primary-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 7V13" stroke="var(--primary-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 13H16" stroke="var(--primary-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>;
const QRIcon = () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="7" height="7" rx="1" stroke="var(--primary-color)" stroke-width="2"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="var(--primary-color)" stroke-width="2"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="var(--primary-color)" stroke-width="2"/><path d="M14 14H15.5C16.3284 14 17 14.6716 17 15.5V17M14 21H17C19.2091 21 21 19.2091 21 17V15.5" stroke="var(--primary-color)" stroke-width="2" stroke-linecap="round"/></svg>;
const MeetingRoomIcon = () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 13H15" stroke="var(--primary-color)" stroke-width="2" stroke-linecap="round"/><path d="M9 9H15" stroke="var(--primary-color)" stroke-width="2" stroke-linecap="round"/><path d="M21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17Z" stroke="var(--primary-color)" stroke-width="2"/><path d="M12 5V21" stroke="var(--primary-color)" stroke-width="2" stroke-linecap="round"/></svg>;

// The rest of the component logic is the same
function Features() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }}, { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return (
    <section id="features" className="section" style={{ backgroundColor: 'var(--light-grey)' }}>
      <div ref={ref} className={`features-container ${isVisible ? 'is-visible' : ''}`}>
        <h2 className="section-title">A Smarter Way to Work</h2>
        <p className="section-subtitle">Everything you need for a productive day, right at your fingertips. Your work life, simplified.</p>
        <div className="features-grid">
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