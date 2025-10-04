import React, { useState, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const closeMobileMenu = () => {
        setIsOpen(false);
        window.scrollTo(0, 0);
    };

    const handleLogout = () => {
        logout();
        closeMobileMenu();
        navigate('/');
    };

    return (
        <header className="header">
            <nav className="navbar">
                <Link to="/" className="nav-logo" onClick={closeMobileMenu}>Co.Work</Link>

                <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
                    <li><NavLink to="/" className="nav-link" onClick={closeMobileMenu}>Explore Spaces</NavLink></li>
                    <li><NavLink to="/about" className="nav-link" onClick={closeMobileMenu}>About Us</NavLink></li>
                    <li><NavLink to="/contact" className="nav-link" onClick={closeMobileMenu}>Contact</NavLink></li>

                    {user ? (
                        <>
                            <li><Link to="/profile" className="nav-link" onClick={closeMobileMenu}>Profile</Link></li>
                            <li><button onClick={handleLogout} className="btn btn-secondary">Log Out</button></li>
                        </>
                    ) : (
                        <li><Link to="/login" className="btn btn-secondary" onClick={closeMobileMenu}>Log In</Link></li>
                    )}
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