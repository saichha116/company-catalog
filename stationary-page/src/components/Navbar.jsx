import "../styles/Navbar.css";
import { FaSearch, FaHeart, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import logo from "../assets/logo.jpeg";

function Navbar({ searchTerm, setSearchTerm }) {
  return (
    <header className="navbar-container">
      <div className="navbar-top">
        <div className="logo">
          <img src={logo} alt="Logo" 
          style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              objectFit: "cover",
            }}/>
        </div>

        <div
  style={{
    position: "relative",
    width: "600px",
  }}
>
  
  <FaSearch
    style={{
      position: "absolute",
      left: "18px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#000",
      fontSize: "16px",
    }}
  />

  <input
  type="text"
  placeholder="Search Products..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  style={{
    width: "100%",
    height: "45px",
    padding: "0 20px 0 45px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "25px",
    outline: "none",
    backgroundColor: "#FAF3F3",
    color: "#000",
  }}
/>
</div>

        <div className="nav-icons">
          <FaHeart />
          <FaShoppingCart />
          <FaUserCircle />
        </div>
      </div>

      <div className="navbar-bottom">
       <ul>
  <li><a href="#">Home</a></li>
  <li><a href="#">About Us</a></li>
  <li><a href="#">Contact Us</a></li>
</ul>
      </div>
    </header>
  );
}

export default Navbar;