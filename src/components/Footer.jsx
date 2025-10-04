import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3 className="footer-logo">Co.Work</h3>
          <p>Your workspace, reimagined.</p>
        </div>
        <div className="footer-links">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Community</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Contact</h4>
          <ul>
            <li><a href="#">support@cowork.com</a></li>
            <li><a href="#">+91 12345 67890</a></li>
            <li><a href="#">Pune, Maharashtra</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Co.Work. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;