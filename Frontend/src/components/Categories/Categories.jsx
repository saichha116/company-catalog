import "./Categories.css";
import { useNavigate } from "react-router-dom";

function Categories() {
  const navigate = useNavigate();

  const categories = [
    {
      title: "Sign Boards",
      className: "category-1",
    },
    {
      title: "Signage Materials",
      className: "category-2",
    },
    {
      title: "Stationery",
      className: "category-3",
    },
    {
      title: "Cleaning Supplies",
      className: "category-4",
    },
  ];

  return (
    <section className="categories">

      <div className="heading">
        <p className="subtitle">BROWSE</p>
        <h2>Shop by Category</h2>
      </div>

      <div className="category-container">

        {categories.map((item) => (
          <div
            key={item.title}
            className={`category-card ${item.className}`}
            onClick={() =>
              navigate(
                `/products?category=${encodeURIComponent(
                  item.title
                )}`
              )
            }
          >
            <div className="category-overlay">
              <h3>{item.title}</h3>

              <span>
                Explore Products →
              </span>
            </div>
          </div>
        ))}

      </div>

    </section>
  );
}

export default Categories;