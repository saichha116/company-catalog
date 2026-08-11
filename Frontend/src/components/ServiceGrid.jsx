import services from "../data/services";
import ServiceCard from "./ServiceCard";

function ServiceGrid({ activeCategory, searchTerm }) {

  console.log("SEARCH TERM:", searchTerm);

  const filteredServices = services.filter((service) => {

    const categoryMatch =
      activeCategory === "All" ||
      service.category === activeCategory;

    const search = searchTerm.trim().toLowerCase();

    const searchMatch =
      search === "" ||
      service.title.toLowerCase().includes(search);

    return categoryMatch && searchMatch;
  });


  return (
    <section className="services">

      <h2>
        {activeCategory === "All"
          ? "All Services"
          : activeCategory}
      </h2>


      <div className="services-grid">

        {filteredServices.length > 0 ? (

          filteredServices.map((service) => (

            <ServiceCard
              key={service.id}
              image={service.image}
              title={service.title}
              category={service.category}
              price={service.price}
              rating={service.rating}
            />

          ))

        ) : (

          <p>No products found.</p>

        )}

      </div>

    </section>
  );
}

export default ServiceGrid;