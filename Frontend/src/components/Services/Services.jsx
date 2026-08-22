import "./Services.css";
import services from "../../data/services";
import ServiceCard from "../ServiceCard";

function Services() {

  const homeServices = services.slice(0, 4);

  return (
    <section className="home-services">

      <div className="home-services-heading">
        <p>OUR SERVICES</p>
        <h2>What We Offer</h2>
      </div>

      <div className="home-service-container">

        {homeServices.map((service) => (
          <ServiceCard
            key={service.id}
            image={service.image}
            title={service.title}
            category={service.category}
            price={service.price}
            rating={service.rating}
          />
        ))}

      </div>

    </section>
  );
}

export default Services;