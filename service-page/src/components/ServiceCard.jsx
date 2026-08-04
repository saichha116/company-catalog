function ServiceCard({
  image,
  title,
  category,
  price,
  rating,
}) {

  return (

    <div className="service-card">


      <div className="card-image">

        <img 
          src={image}
          alt={title}
        />


        <span className="badge">
          Popular
        </span>


      </div>



      <div className="card-content">


        <p className="category">
          {category}
        </p>


        <h3>
          {title}
        </h3>


        <div className="rating">

          ⭐⭐⭐⭐⭐

          <span>
            {rating}
          </span>

        </div>


        <p className="price">
          {price}
        </p>



        <button>
          View Details
        </button>


      </div>


    </div>

  );

}


export default ServiceCard;