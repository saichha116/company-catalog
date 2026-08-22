import { useState } from "react";
import "../styles/CategoryFilter.css";

function CategoryFilter({ selectedCategory, setSelectedCategory }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const categories = [
    "All",
    "Sign Boards",
    "Signature Materials",
    "Cleaning Supplies",
  ];

  const stationeryItems = [
    "Paper",
    "Writing",
    "Computer Media",
    "Desk & Tools",
  ];

  return (
    <div className="category-container">
      <button
        className={selectedCategory === "All" ? "active" : ""}
        onClick={() => setSelectedCategory("All")}
      >
        All
      </button>

      <div
        className="dropdown-wrapper"
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        <button
          className={
            selectedCategory === "Stationery" ||
            stationeryItems.includes(selectedCategory)
              ? "active"
              : ""
          }
          onClick={() => setSelectedCategory("Stationery")}
        >
          Stationery ▼
        </button>

        {showDropdown && (
          <div className="dropdown-menu">
            {stationeryItems.map((item) => (
              <div
                key={item}
                className="dropdown-item"
                onClick={() => {
                  setSelectedCategory(item);
                  setShowDropdown(false);
                }}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>

      {categories.slice(1).map((category) => (
        <button
          key={category}
          className={selectedCategory === category ? "active" : ""}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;