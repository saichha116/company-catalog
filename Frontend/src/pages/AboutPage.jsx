import about from "../assets/about.png";
import "../styles/AboutPage.css";

import Footer from "../components/Footer";

import {
  FaBoxOpen,
  FaAward,
  FaHandshake,
} from "react-icons/fa";

function AboutPage() {
  return (
    <div>

      <section className="about-hero">

        <div className="about-content">

          <h5 className="about-small-title">
            About Us
          </h5>

          <h1 className="about-heading">
            Everything You Need
            <br />
            For Learning, Working & Creating.
          </h1>

          <p className="about-description">
            At Design & Printing, we provide high-quality stationery
            products for students, professionals, schools, and businesses.
            From notebooks and pens to office supplies and art materials,
            we make everyday work and creativity easier.
          </p>

        </div>

        <div className="about-image">
          <img
            src={about}
            alt="Stationery Products"
          />
        </div>

      </section>


      <section className="about-cards">

        <div className="about-card">

          <FaBoxOpen className="card-icon" />

          <div>

            <h3>Our Products</h3>

            <p>
              We offer a wide collection of stationery products including
              notebooks, pens, files, office essentials and art supplies
              to meet every need.
            </p>

          </div>

        </div>


        <div className="about-card">

          <FaAward className="card-icon" />

          <div>

            <h3>Premium Quality</h3>

            <p>
              Every product is carefully selected to provide quality,
              durability and value for students, professionals and businesses.
            </p>

          </div>

        </div>


        <div className="about-card">

          <FaHandshake className="card-icon" />

          <div>

            <h3>Customer Commitment</h3>

            <p>
              We are committed to delivering affordable stationery,
              reliable service and a smooth shopping experience for every customer.
            </p>

          </div>

        </div>

      </section>


      <Footer />

    </div>
  );
}

export default AboutPage;