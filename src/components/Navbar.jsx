import React, { useState } from 'react';
// 1. Import Link and NavLink from react-router-dom
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

// 2. Remove the unused `setPage` prop
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // This function closes the mobile menu after a link is clicked
  const closeMobileMenu = () => {
    setIsOpen(false);
    window.scrollTo(0, 0); // Optional: scrolls to top on navigation
  };

  return (
    <header className="header">
      <nav className="navbar">
        {/* 3. Use <Link> for the logo to navigate home */}
        <Link to="/" className="nav-logo" onClick={closeMobileMenu}>Co.Work</Link>
        
        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          
          {/* 4. Use NavLink for standard navigation links */}
          {/* NavLink will automatically get an "active" class for styling */}
          <li><NavLink to="/" className="nav-link" onClick={closeMobileMenu}>Explore Spaces</NavLink></li>
          <li><NavLink to="/about" className="nav-link" onClick={closeMobileMenu}>About Us</NavLink></li>
          <li><NavLink to="/contact" className="nav-link" onClick={closeMobileMenu}>Contact</NavLink></li>
          
          {/* This can remain a regular anchor tag if it's not a router page */}
          <li><a href="#login" className="btn btn-secondary" onClick={closeMobileMenu}>Log In</a></li>
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