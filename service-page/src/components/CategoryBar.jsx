function CategoryBar({ activeCategory, setActiveCategory }) {

  const categories = [
    "All",
    "Printing",
    "Branding",
    "Fabrication",
    "Book Binding",
  ];

  return (
    <div className="category-bar">

      {categories.map((category) => (

        <button
          key={category}
          className={
            activeCategory === category
              ? "active"
              : ""
          }
          onClick={() => setActiveCategory(category)}
        >

          {category}

        </button>

      ))}

    </div>
  );
}

export default CategoryBar;