import "./Categories.css";

function Categories() {
const categories = [
  { title: "Sign Boards" },
  { title: "Signage Materials" },
  { title: "Stationery" },
  { title: "Cleaning Supplies" },
];

  return (
    <section className="categories">

      <div className="heading">
        <p className="subtitle">BROWSE</p>
        <h2>Shop by Category</h2>
      </div>

      <div className="category-container">

        {categories.map((item, index) => (
          <div className="category-card" key={index}>
            <div className="image-placeholder"></div>
            <h3>{item.title}</h3>
          </div>
        ))}

        <button className="arrow-btn">
          &#8594;
        </button>

      </div>

    </section>
  );
}

export default Categories;