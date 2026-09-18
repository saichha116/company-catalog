
import { useNavigate } from "react-router-dom";

function ServiceCard({
  id,
  image,
  title,
  category,
  price,
  fromHome,
  wishlist = [],
  setWishlist,
}) {
  const navigate = useNavigate();

  // =========================
  // GET LOGGED-IN USER
  // =========================

  const getUser = () => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      return null;
    }

    try {
      return JSON.parse(savedUser);
    } catch (error) {
      console.error("Invalid user data:", error);
      return null;
    }
  };

  const user = getUser();


  // =========================
  // CHECK IF SERVICE IS LIKED
  // =========================

  const isLiked = wishlist.some(
    (item) =>
      Number(item.id) === Number(id) &&
      item.type === "service"
  );


  // =========================
  // OPEN SERVICE DETAILS
  // =========================

  const openDetails = () => {
    if (fromHome) {
      navigate("/services");
    } else {
      navigate(`/service/${id}`);
    }
  };


  // =========================
  // LOAD WISHLIST
  // =========================

  const loadWishlist = async () => {

    if (!user?.id) {
      return [];
    }

    try {

      const response = await fetch(
        `http://localhost:5000/api/wishlist/${user.id}`
      );

      if (!response.ok) {
        throw new Error("Failed to load wishlist");
      }

      const data = await response.json();

      setWishlist(data);

      return data;

    } catch (error) {

      console.error(
        "Error loading wishlist:",
        error
      );

      return [];
    }
  };


  // =========================
  // TOGGLE WISHLIST
  // =========================

  const toggleWishlist = async (e) => {

    e.stopPropagation();


    // User must be logged in

    if (!user || !user.id) {

      alert(
        "Please login to use wishlist."
      );

      return;
    }


    const userId = user.id;


    try {

      // =================================================
      // REMOVE SERVICE
      // =================================================

      if (isLiked) {

        const response = await fetch(
          "http://localhost:5000/api/wishlist",
          {
            method: "DELETE",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              user_id: userId,

              item_id: id,

              item_type: "service",

            }),
          }
        );


        const data =
          await response.json();


        if (!response.ok) {

          throw new Error(
            data.message ||
            "Failed to remove service from wishlist"
          );

        }


        // Update React state

        setWishlist(
          wishlist.filter(
            (item) =>
              !(
                Number(item.id) === Number(id) &&
                item.type === "service"
              )
          )
        );


        alert(
          `${title} removed from wishlist!`
        );


        return;
      }


      // =================================================
      // ADD SERVICE
      // =================================================

      const response = await fetch(
        "http://localhost:5000/api/wishlist",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            user_id: userId,

            item_id: id,

            item_type: "service",

          }),
        }
      );


      const data =
        await response.json();


      // =================================================
      // ALREADY EXISTS
      // =================================================

      if (response.status === 409) {

        console.log(
          "Service already exists. Synchronizing wishlist..."
        );


        const latestWishlist =
          await loadWishlist();


        const alreadyExists =
          latestWishlist.some(
            (item) =>
              Number(item.id) === Number(id) &&
              item.type === "service"
          );


        if (alreadyExists) {

          alert(
            `${title} is already in your wishlist.`
          );

        }


        return;
      }


      // =================================================
      // OTHER ERROR
      // =================================================

      if (!response.ok) {

        throw new Error(
          data.message ||
          "Failed to add service to wishlist"
        );

      }


      // =================================================
      // ADD TO REACT STATE
      // =================================================

      setWishlist([

        ...wishlist,

        {

          wishlist_id:
            data.wishlist_id,

          id: id,

          name: title,

          title: title,

          description: "",

          image: image,

          category: category,

          price: price,

          type: "service",

        },

      ]);


      alert(
        `${title} added to wishlist!`
      );

    } catch (error) {

      console.error(
        "Wishlist error:",
        error
      );


      alert(
        error.message ||
        "Something went wrong with wishlist."
      );

    }
  };


  return (

    <div
      className="service-card"
      onClick={openDetails}
      style={{
        cursor: "pointer",
      }}
    >

      {/* =========================
          IMAGE
      ========================= */}

      <div className="card-image">

        <img
          src={image}
          alt={title}
        />


        {/* =========================
            WISHLIST
        ========================= */}

        <button
          type="button"
          className={`like-button ${
            isLiked ? "liked" : ""
          }`}
          onClick={toggleWishlist}
          aria-label={
            isLiked
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
        >

          {isLiked ? "♥" : "♡"}

        </button>

      </div>


      {/* =========================
          CARD CONTENT
      ========================= */}

      <div className="card-content">

        <p className="category">
          {category}
        </p>


        <h3>
          {title}
        </h3>


        <p className="price">
          {price}
        </p>


        {/* =========================
            ADD TO CART
        ========================= */}

        <button
          type="button"
          onClick={(e) => {

            e.stopPropagation();

            // Add cart functionality here later

          }}
        >
          Add to Cart
        </button>

      </div>

    </div>

  );
}

export default ServiceCard;

