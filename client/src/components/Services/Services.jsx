import "./Services.css";
import { useNavigate } from "react-router-dom";

function Services() {
  const navigate = useNavigate();

  const services = [
    { title: "Printing" },
    { title: "Branding" },
    { title: "Fabrication" },
    { title: "Book Binding" },
  ];

  const handleServiceClick = (service) => {
    navigate(`/services?category=${encodeURIComponent(service)}`);
  };

  return (
    <section className="services">

      <div className="heading">
        <p className="subtitle">OUR SERVICES</p>
        <h2>What We Offer</h2>
      </div>

      <div className="service-container">

        {services.map((item, index) => (
          <div
            className="service-card"
            key={index}
            onClick={() => handleServiceClick(item.title)}
          >
            <div className="image-placeholder"></div>

            <h3>{item.title}</h3>
          </div>
        ))}

      </div>

    </section>
  );
}

export default Services;