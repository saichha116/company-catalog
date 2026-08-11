import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUserCircle
} from "react-icons/fa";

import { Link } from "react-router-dom";

import logo from "../assets/logo.jpeg";

function Navbar({ searchTerm, setSearchTerm }) {
  return (
    <nav className="navbar">

      {/* TOP ROW */}
      <div className="navbar-top">

        {/* LOGO */}
        <Link to="/" className="logo">
          <img src={logo} alt="Design N Print Logo" />
        </Link>

        {/* SEARCH BAR */}
        <div className="search-box">
          <FaSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search Products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* RIGHT ICONS */}
        <div className="nav-icons">
          <FaHeart className="nav-icon" />
          <FaShoppingCart className="nav-icon" />
          <FaUserCircle className="nav-icon" />
        </div>

      </div>

      {/* BOTTOM NAVIGATION */}
      <div className="nav-links">

        <Link to="/" className="nav-link">
          Home
        </Link>

        <Link to="/about" className="nav-link">
          About Us
        </Link>

        <Link to="/contact" className="nav-link">
          Contact Us
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;