import "../styles/CategoryFilter.css";

function CategoryFilter({ selectedCategory, setSelectedCategory }) {
  const categories = [
    "All",
    "Stationery",
    "Sign Boards",
    "Signature Materials",
    "Cleaning Supplies",
  ];

  return (
    <div className="category-container">
      {categories.map((category) => (
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