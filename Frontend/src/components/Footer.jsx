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

        {/* =========================
            COMPANY
        ========================= */}
        <div className="footer-section company-section">
          <h2>
            DESIGN AND
            <br />
            PRINTING
          </h2>

          <p className="footer-tagline">
            Quality Printing,
            <br />
            Creative Solutions.
          </p>
        </div>


        {/* =========================
            QUICK LINKS
        ========================= */}
        <div className="footer-section quick-links-section">
          <h3>Quick Links</h3>

          <div className="quick-links">
            <p>Home</p>
            <p>About Us</p>
            <p>Contact Us</p>
          </div>
        </div>


        {/* =========================
            CONTACT INFO
        ========================= */}
        <div className="footer-section contact-section">
          <h3>Contact Info</h3>

          <p>
            <span className="footer-icon">
              <FaMapMarkerAlt />
            </span>

            <span>Ponda, Goa 403401</span>
          </p>

          <p>
            <span className="footer-icon">
              <FaPhoneAlt />
            </span>

            <span>+91 8806453029</span>
          </p>

          <p>
            <span className="footer-icon">
              <FaEnvelope />
            </span>

            <span>inquiry@imscad.co.in</span>
          </p>
        </div>


        {/* =========================
            FOLLOW US
        ========================= */}
        <div className="footer-section social-section">
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


      {/* =========================
          COPYRIGHT
      ========================= */}
      <div className="footer-bottom">
        © 2026 Design and Printing. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;