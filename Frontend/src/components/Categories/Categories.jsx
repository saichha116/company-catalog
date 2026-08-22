import "./Categories.css";
import { useNavigate } from "react-router-dom";

function Categories() {
  const navigate = useNavigate();

  const categories = [
    { title: "Sign Boards" },
    { title: "Signage Materials" },
    { title: "Stationery" },
    { title: "Cleaning Supplies" },
  ];

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="categories">

      <div className="heading">
        <p className="subtitle">BROWSE</p>
        <h2>Shop by Category</h2>
      </div>

      <div className="category-container">

        {categories.map((item, index) => (
          <div
            className="category-card"
            key={index}
            onClick={() => handleCategoryClick(item.title)}
          >
            <div className="image-placeholder"></div>

            <h3>{item.title}</h3>
          </div>
        ))}

      </div>

    </section>
  );
}

export default Categories;