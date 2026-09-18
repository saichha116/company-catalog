
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import "./AddProduct.css";

function AddCategory() {

    const navigate = useNavigate();

    const [category, setCategory] = useState({
        main_category_id: "",
        category_name: "",
        description: ""
    });

    const [image, setImage] = useState(null);


    const handleChange = (e) => {

        setCategory({
            ...category,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append(
            "main_category_id",
            category.main_category_id
        );

        formData.append(
            "category_name",
            category.category_name
        );

        formData.append(
            "description",
            category.description
        );

        if (image) {

            formData.append(
                "category_image",
                image
            );

        }


        try {

            const response = await axios.post(
                "http://localhost:5000/api/categories",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            console.log(response.data);

            alert("Category added successfully");

            navigate("/admin/categories");

        }
        catch (error) {

            console.log(error);

            alert("Category add failed");

        }

    };


    return (

        <div className="dashboard-layout">

            <AdminSidebar />

            <div className="dashboard-content">

                <h1>
                    Add Category
                </h1>


                <form
                    className="product-form"
                    onSubmit={handleSubmit}
                >


                    {/* Main Category */}

                    <select
                        name="main_category_id"
                        value={category.main_category_id}
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


                    {/* Category Name */}

                    <input
                        type="text"
                        name="category_name"
                        value={category.category_name}
                        placeholder="Category Name"
                        onChange={handleChange}
                        required
                    />


                    {/* Description */}

                    <textarea
                        name="description"
                        value={category.description}
                        placeholder="Category Description"
                        onChange={handleChange}
                    />


                    {/* Image */}

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setImage(e.target.files[0])
                        }
                    />


                    {/* Save */}

                    <button type="submit">
                        Save Category
                    </button>


                </form>

            </div>

        </div>

    );

}


export default AddCategory;

