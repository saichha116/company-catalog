import { useState } from "react";
import "../styles/CategoryFilter.css";

function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
}) {
  const [showDropdown, setShowDropdown] = useState(false);

  const categories = [
    "Sign Boards",
    "Signage Materials",
    "Cleaning Supplies",
  ];

  const stationeryItems = [
    "Writing",
    "Computer Media",
    "Paper",
    "Desk & Tools",
  ];

  return (
    <div className="category-container">

      {/* ALL */}
      <button
        type="button"
        className={
          selectedCategory === "All" ? "active" : ""
        }
        onClick={() => setSelectedCategory("All")}
      >
        All
      </button>


      {/* OFFICE STATIONERY DROPDOWN */}
      <div
        className="dropdown-wrapper"
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >

        <button
          type="button"
          className={
            selectedCategory === "Office Stationery" ||
            stationeryItems.includes(selectedCategory)
              ? "active"
              : ""
          }
          onClick={() =>
            setSelectedCategory("Office Stationery")
          }
        >
          Office Stationery
          <span className="dropdown-arrow">▼</span>
        </button>


        {/* DROPDOWN */}
        {showDropdown && (
          <div className="dropdown-menu">

            {stationeryItems.map((item) => (
              <button
                type="button"
                key={item}
                className="dropdown-item"
                onClick={() => {
                  setSelectedCategory(item);
                  setShowDropdown(false);
                }}
              >
                {item}
              </button>
            ))}

          </div>
        )}

      </div>


      {/* OTHER CATEGORIES */}
      {categories.map((category) => (
        <button
          type="button"
          key={category}
          className={
            selectedCategory === category
              ? "active"
              : ""
          }
          onClick={() =>
            setSelectedCategory(category)
          }
        >
          {category}
        </button>
      ))}

    </div>
  );
}

export default CategoryFilter;