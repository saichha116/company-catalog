import services from "../data/services";
import ServiceCard from "./ServiceCard";


function ServiceGrid({ activeCategory, searchTerm }) {


  const filteredServices = services.filter((service) => {

  const categoryMatch =
    activeCategory === "All" ||
    service.category === activeCategory;


  const searchMatch =
    service.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());


  return categoryMatch && searchMatch;

});


  return (
    <section className="services">
<h2>
  {activeCategory === "All" ? "All Services" : activeCategory}
</h2>

      <div className="services-grid">

        {filteredServices.map((service) => (

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


export default ServiceGrid;