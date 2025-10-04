import React, { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <nav className="navbar">
        <a href="/" className="nav-logo">Co.Work</a>
        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          {/* --- TEXT UPDATED BELOW --- */}
          <li className="nav-item"><a href="#features" className="nav-link" onClick={() => setIsOpen(false)}>Explore Spaces</a></li>
          
          {/* --- TEXT UPDATED BELOW --- */}
          <li className="nav-item"><a href="#pricing" className="nav-link" onClick={() => setIsOpen(false)}>About Us</a></li>
          
          <li className="nav-item"><a href="#contact" className="nav-link" onClick={() => setIsOpen(false)}>Contact</a></li>
          <li className="nav-item-cta"><a href="/login" className="btn btn-secondary">Log In</a></li>
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