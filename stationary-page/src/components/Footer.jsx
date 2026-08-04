import "../styles/Footer.css";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Company */}
        <div className="footer-section company-section">
          <h2>
            DESIGN AND
            <br />
            PRINTING
          </h2>
        </div>

        {/* Quick Links */}
       <div className="footer-section">
  <h3>Quick Links</h3>

  <div className="quick-links">
    <p>Home</p>
    <p>About Us</p>
    <p>Contact Us</p>
  </div>
</div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3>Contact Info</h3>

          <p>
            <FaMapMarkerAlt className="footer-icon" />
            <span>Ponda, Goa 403401</span>
          </p>

          <p>
            <FaPhoneAlt className="footer-icon" />
            <span>+91 8806453029</span>
          </p>

          <p>
            <FaEnvelope className="footer-icon" />
            <span>inquiry@imscad.co.in</span>
          </p>
        </div>

        {/* Follow Us */}
        <div className="footer-section">
          <h3>Follow Us</h3>

          <div className="social-icons">
            <FaInstagram aria-label="Instagram" />
            <FaFacebook aria-label="Facebook" />
          </div>

          <p className="social-text">
            Stay connected with
            <br />
            our latest work.
          </p>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Design and Printing. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;