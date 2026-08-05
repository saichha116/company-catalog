import logo from "../../assets/logo.jpeg";
import { FaHeart, FaShoppingCart, FaUserCircle,FaSearch } from "react-icons/fa";

function Navbar() {
  return (
    <>
      {/* Top Navbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "15px 30px",
          background: "#fff",
          borderBottom: "1px solid #ddd",
        }}
      >
        {/* Logo */}
        <div>
          <img
            src={logo}
            alt="Logo"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
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
    style={{
      width: "100%",
      height: "45px",
      padding: "0 20px 0 45px",
      fontSize: "16px",
      border: "1px solid #ddd",
      borderRadius: "25px",
      outline: "none",
      backgroundColor: "#FAF3F3",
      color:"#000",
    }}
  />
</div>

        {/* Icons */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            fontSize: "24px",
            color:"#000",
            cursor: "pointer",
          }}
        >
          <FaHeart />
          <FaShoppingCart />
          <FaUserCircle />
        </div>
      </div>

      {/* Menu */}
     <div
  style={{
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "40px",
    padding: "15px 30px",
    background: "#fff",
    borderBottom: "1px solid #ddd",
  }}
>
      
        <a href="#" style={{ textDecoration: "none", color: "#000" }}>
          Home
        </a>

        <a href="#" style={{ textDecoration: "none", color: "#000" }}>
          About Us
        </a>

        <a href="#" style={{ textDecoration: "none", color: "#000" }}>
          Contact Us
        </a>
      </div>
    </>
  );
}

export default Navbar;