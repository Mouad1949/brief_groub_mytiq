import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/Navbar.css";
import { RoleContext } from "../context/RoleContext";

const Navbar = () => {
  const {role,setRole} = useContext(RoleContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedRole = localStorage.getItem("user_role");
    setRole(savedRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_role");
    setRole(null);
    navigate("/login");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="nav">
      <div className="nav-container">
        <div className="nav-left">
          <Link to="/" className="logo">MyTiq</Link>
        </div>

        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? "✕" : "☰"}
        </button>

        <div className={`nav-right ${isMenuOpen ? "active" : ""}`}>
          {role ? (
            <>
              <nav className="nav-links">
                <Link to="/" onClick={closeMenu}>Events</Link>
                {role === "user" && <Link to="/my-tickets" onClick={closeMenu}>My Tickets</Link>}
                {role === "admin" && <Link to="/tickets" onClick={closeMenu}>Admin Panel</Link>}
              </nav>
              <button className="btn-solid" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link className="btn-outline" to="/login" onClick={closeMenu}>Login</Link>
              <Link className="btn-solid" to="/register" onClick={closeMenu}>Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
