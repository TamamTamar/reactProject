import { useState } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import Search from "../Search/Search";
import "./Navbar.scss";

const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(menuOpen => !menuOpen);
  };


  return (
    <>
      <nav className="site-navbar">
        <div className="nav-left">
          <button className="burger-icon" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <div className={`menu-links ${menuOpen ? "open" : ""}`}>
            <NavLink to="/" className="brand" onClick={() => setMenuOpen(false)} >
              Home
            </NavLink>
            <NavLink to="/about" className="about" onClick={() => setMenuOpen(false)} >
              About
            </NavLink>
            {isLoggedIn && <NavLink to="/favorites" onClick={() => setMenuOpen(false)} >Favorites</NavLink>}
            {isLoggedIn && user?.isBusiness && (
              <>
                <NavLink to="/my-cards" onClick={() => setMenuOpen(false)} >My Cards</NavLink >
                <NavLink to="/create-card" onClick={() => setMenuOpen(false)} >Create Card</NavLink>
              </>
            )}
          </div>
        </div>
        <div className="nav-right">
          {!isLoggedIn && <NavLink to="/login">Login</NavLink>}
          {isLoggedIn && (
            <div className="user-menu">
              <FaUserCircle />
              <div className="user-menu-content">
                <button className="user-name-button mt-1" onClick={() => navigate("/profile")}>
                  {user && `${user.name.first.charAt(0).toUpperCase() + user.name.first.slice(1)} ${user.name.last.charAt(0).toUpperCase() + user.name.last.slice(1)}`}
                </button>
                <button onClick={() => { logout(); navigate("/"); }}>
                  Logout
                </button>
              </div>
            </div>
          )}
          <div>
            <DarkModeToggle />
          </div>
          <div>
            <Search />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
