import services from "../data/services";
import ServiceCard from "./ServiceCard";

function ServiceGrid({
  activeCategory = "All",
  searchTerm = "",
  limit,
  fromHome = false,
  wishlist,
  setWishlist,
}) {
  const search = searchTerm.trim().toLowerCase();

  const filteredServices = services.filter((service) => {
    const categoryMatch =
      activeCategory === "All" ||
      service.category === activeCategory;

    const searchMatch =
      search === "" ||
      service.title.toLowerCase().includes(search) ||
      service.category.toLowerCase().includes(search);

    return categoryMatch && searchMatch;
  });

  const displayedServices = limit
    ? filteredServices.slice(0, limit)
    : filteredServices;

  return (
    <section className="services">

      <div className="heading">
        <p className="subtitle">OUR SERVICES</p>

        <h2>What We Offer</h2>
      </div>

      <div className="services-grid">

        {displayedServices.length > 0 ? (

          displayedServices.map((service) => (

            <ServiceCard
              key={service.id}
              id={service.id}
              image={service.image}
              title={service.title}
              category={service.category}
              price={service.price}
              fromHome={fromHome}
              wishlist={wishlist}
              setWishlist={setWishlist}
            />

          ))

        ) : (

          <p>No services found.</p>

        )}

      </div>

    </section>
  );
}

export default ServiceGrid;