import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_role");
    setIsLoggedIn(false);
    navigate("/login");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="nav">
      <div className="nav-container">
        {/* LEFT : LOGO */}
        <div className="nav-left">
          <Link to="/" className="logo">MyTiq</Link>
        </div>

        {/* HAMBURGER MENU ICON */}
        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? "✕" : "☰"}
        </button>

        {/* RIGHT : LINKS + BUTTONS */}
        <div className={`nav-right ${isMenuOpen ? "active" : ""}`}>
          <nav className="nav-links">
            <Link to="/events" onClick={closeMenu}>Events</Link>
            <Link to="/admin" onClick={closeMenu}>Admin</Link>
            <Link to="/my-tickets" onClick={closeMenu}>My Tickets</Link>
          </nav>

          <Link className="btn-outline" to="/login" onClick={closeMenu}>Login</Link>
          <button className="btn-solid" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;