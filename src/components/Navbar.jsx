import React, { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

// Avatar component to generate initials from a name
const Avatar = ({ name }) => {
    const initials = name
        ? name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .substring(0, 2)
            .toUpperCase()
        : "?";
    return <div className="navbar-user-avatar">{initials}</div>;
};

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const closeAllMenus = () => {
        setIsMobileMenuOpen(false);
        setIsDropdownOpen(false);
    };

    const handleLogout = () => {
        logout();
        closeAllMenus();
        navigate("/");
    };

    return (
        <header className="navbar-header">
            <nav className="navbar-component">
                <Link to="/" className="navbar-logo-link" onClick={closeAllMenus}>
                    <img src="/logo.png" alt="Co.Work Logo" className="navbar-logo-img" />
                </Link>

                <ul className={isMobileMenuOpen ? "navbar-menu active" : "navbar-menu"}>
                    <li>
                        <NavLink to="/" className="navbar-link" onClick={closeAllMenus}>
                            Explore Spaces
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className="navbar-link" onClick={closeAllMenus}>
                            About Us
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" className="navbar-link" onClick={closeAllMenus}>
                            Contact
                        </NavLink>
                    </li>
                    {!user && (
                        <li>
                            <Link to="/login" className="navbar-btn-glow" onClick={closeAllMenus}>
                                Log In
                            </Link>
                        </li>
                    )}
                </ul>

                {user && (
                    <div className="navbar-user-menu-container">
                        <div onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                            <Avatar name={user.name} />
                        </div>

                        <ul className={`navbar-dropdown-menu ${isDropdownOpen ? "active" : ""}`}>
                            <li>
                                <Link
                                    to="/profile"
                                    className="navbar-dropdown-item"
                                    onClick={closeAllMenus}
                                >
                                    Profile
                                </Link>
                            </li>
                            <li>
                                {/* --- THIS IS THE CORRECTED LINE --- */}
                                <Link
                                    to="/my-bookings"
                                    className="navbar-dropdown-item"
                                    onClick={closeAllMenus}
                                >
                                    My Bookings
                                </Link>
                            </li>
                            <li onClick={handleLogout} className="navbar-dropdown-item navbar-logout">
                                Log Out
                            </li>
                        </ul>
                    </div>
                )}

                <div
                    className={isMobileMenuOpen ? "navbar-hamburger active" : "navbar-hamburger"}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <span className="navbar-bar"></span>
                    <span className="navbar-bar"></span>
                    <span className="navbar-bar"></span>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;