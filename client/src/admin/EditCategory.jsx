import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import "./Categories.css";

function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState({
    category_name: "",
    description: "",
    main_category_id: "",
    category_image: null,
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((res) => {
        const data = res.data.find(
          (cat) => cat.category_id === Number(id)
        );

        if (data) {
          setCategory(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append(
      "category_name",
      category.category_name
    );

    formData.append(
      "description",
      category.description
    );

    formData.append(
      "main_category_id",
      category.main_category_id
    );

    if (image) {
      formData.append(
        "category_image",
        image
      );
    }

    try {
      await axios.put(
        `http://localhost:5000/api/categories/${id}`,
        formData
      );

      alert("Category updated successfully");

      navigate("/admin/categories");
    } catch (err) {
      console.log(err);
      alert("Category update failed");
    }
  };

  return (
    <div className="dashboard-layout">

      <AdminSidebar />

      <div className="dashboard-content">

        <h1>Edit Category</h1>

        <form
          className="product-form"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="category_name"
            value={category.category_name || ""}
            placeholder="Category Name"
            onChange={handleChange}
            required
          />

          <select
            name="main_category_id"
            value={category.main_category_id || ""}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Main Category
            </option>

            <option value="1">
              Products
            </option>

            <option value="2">
              Services
            </option>
          </select>

          <textarea
            name="description"
            value={category.description || ""}
            placeholder="Description"
            onChange={handleChange}
          />

          {category.category_image && (
            <div>
              <p>Current Image:</p>

              <img
                src={`http://localhost:5000/uploads/${category.category_image}`}
                alt={category.category_name}
                width="120"
              />
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files[0])
            }
          />

          <button type="submit">
            Update Category
          </button>

        </form>

      </div>
    </div>
  );
}

export default EditCategory;