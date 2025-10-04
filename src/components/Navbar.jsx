import React, { useState } from 'react';
import './Navbar.css';

function Navbar({ setPage }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (page) => {
    setPage(page);
    setIsOpen(false);
    // Scroll to top of the page on navigation
    window.scrollTo(0, 0); 
  };

  return (
    <header className="header">
      <nav className="navbar">
        <a href="#home" className="nav-logo" onClick={() => handleNavClick('home')}>Co.Work</a>
        
        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          {/* Use an anchor tag for homepage sections for now */}
          <li><a href="/#features" className="nav-link" onClick={() => handleNavClick('home')}>Explore Spaces</a></li>
          <li><a href="#about" className="nav-link" onClick={() => handleNavClick('about')}>About Us</a></li>
          
          {/* This now correctly switches to the contact page */}
          <li><a href="#contact" className="nav-link" onClick={() => handleNavClick('contact')}>Contact</a></li>
          
          <li className="nav-item-cta"><a href="#login" className="btn btn-secondary">Log In</a></li>
        </ul>
        <div className={isOpen ? "hamburger active" : "hamburger"} onClick={() => setIsOpen(!isOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;