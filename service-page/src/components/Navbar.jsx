import { FaSearch, FaHeart, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import logo from "../assets/logo.jpeg";

function Navbar({ searchTerm, setSearchTerm }) {
  return (
    <nav className="navbar">

      {/* Logo */}

      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      {/* Search */}

      <div className="search-box">

        <FaSearch className="search-icon" />

       <input
  type="text"
  placeholder="Search for Products..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>

      </div>

      {/* Icons */}

      <div className="nav-icons">

        <FaHeart />

        <FaShoppingCart />

        <FaUserCircle />

      </div>

    </nav>
  );
}

export default Navbar;