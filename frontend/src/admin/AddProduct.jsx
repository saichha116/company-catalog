
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import "./AddProduct.css";

function AddProduct() {

    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);

    const [mainCategory, setMainCategory] = useState("");

    const navigate = useNavigate();


    const [product, setProduct] = useState({

        category_id: "",
        subcategory_id: "",
        product_name: "",
        description: "",
        min_price: "",
        max_price: "",
        stock: ""

    });


    const [image, setImage] = useState(null);


    // Get categories
    useEffect(() => {

        axios.get("http://localhost:5000/api/categories")

            .then((res) => {

                setCategories(res.data);

            })

            .catch((err) => {

                console.log(err);

            });

    }, []);


    // Get subcategories when category changes
    useEffect(() => {

        if (!product.category_id) {

            setSubcategories([]);

            return;

        }


        axios.get(
            `http://localhost:5000/api/subcategories/category/${product.category_id}`
        )

            .then((res) => {

                setSubcategories(res.data);

            })

            .catch((err) => {

                console.log(err);

                setSubcategories([]);

            });

    }, [product.category_id]);


    // Main Category change
    const handleMainCategoryChange = (e) => {

        const value = e.target.value;

        setMainCategory(value);

        setProduct({

            ...product,

            category_id: "",
            subcategory_id: ""

        });

        setSubcategories([]);

    };


    // Category change
    const handleCategoryChange = (e) => {

        setProduct({

            ...product,

            category_id: e.target.value,
            subcategory_id: ""

        });

    };


    // Other input changes
    const handleChange = (e) => {

        setProduct({

            ...product,

            [e.target.name]: e.target.value

        });

    };


    // Submit
    const handleSubmit = async (e) => {

        e.preventDefault();


        const formData = new FormData();


        formData.append(
            "category_id",
            product.category_id
        );


        formData.append(
            "subcategory_id",
            product.subcategory_id
        );


        formData.append(
            "product_name",
            product.product_name
        );


        formData.append(
            "description",
            product.description
        );


        formData.append(
            "min_price",
            product.min_price
        );


        formData.append(
            "max_price",
            product.max_price
        );


        formData.append(
            "stock",
            product.stock
        );


        if (image) {

            formData.append(
                "image",
                image
            );

        }


        try {

            const response = await axios.post(

                "http://localhost:5000/api/products",

                formData,

                {

                    headers: {

                        "Content-Type":
                            "multipart/form-data"

                    }

                }

            );


            console.log(response.data);


            alert(
                "Product Added Successfully"
            );


            navigate(
                "/admin/products"
            );


        }

        catch (error) {

            console.log(error);

            alert(
                "Product Add Failed"
            );

        }

    };


    return (

        <div className="dashboard-layout">


            <AdminSidebar />


            <div className="dashboard-content">

                 <h1>
                {mainCategory === "2"
                     ? "Add Service"
                     : "Add Product"}
                </h1>
               

                <form
                    className="product-form"
                    onSubmit={handleSubmit}
                >


                    {/* Product Name */}

                    <input

                        type="text"

                        name="product_name"

                        value={
                            product.product_name
                        }

                        placeholder="Product Name"

                        onChange={
                            handleChange
                        }

                        required

                    />


                    {/* Main Category */}

                    <select

                        value={mainCategory}

                        onChange={
                            handleMainCategoryChange
                        }

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


                    {/* Category */}

                    {mainCategory && (

                        <select

                            name="category_id"

                            value={
                                product.category_id
                            }

                            onChange={
                                handleCategoryChange
                            }

                            required

                        >

                            <option value="">
                                Select Category
                            </option>


                            {categories

                                .filter(
                                    (cat) =>
                                        String(
                                            cat.main_category_id
                                        ) ===
                                        String(
                                            mainCategory
                                        )
                                )

                                .map((cat) => (

                                    <option

                                        key={
                                            cat.category_id
                                        }

                                        value={
                                            cat.category_id
                                        }

                                    >

                                        {
                                            cat.category_name
                                        }

                                    </option>

                                ))}

                        </select>

                    )}


                    {/* Description */}

                    <textarea

                        name="description"

                        value={
                            product.description
                        }

                        placeholder="Product Description"

                        onChange={
                            handleChange
                        }

                    />


                    {/* Subcategory */}

                    {subcategories.length > 0 && (

                        <select

                            name="subcategory_id"

                            value={
                                product.subcategory_id
                            }

                            onChange={
                                handleChange
                            }

                            required

                        >

                            <option value="">
                                Select Subcategory
                            </option>


                            {subcategories.map(
                                (sub) => (

                                    <option

                                        key={
                                            sub.subcategory_id
                                        }

                                        value={
                                            sub.subcategory_id
                                        }

                                    >

                                        {
                                            sub.subcategory_name
                                        }

                                    </option>

                                )
                            )}

                        </select>

                    )}


                    {/* Price */}

                    <div className="price-box">


                        <input

                            type="number"

                            name="min_price"

                            value={
                                product.min_price
                            }

                            placeholder="Minimum Price"

                            onChange={
                                handleChange
                            }

                        />


                        <input

                            type="number"

                            name="max_price"

                            value={
                                product.max_price
                            }

                            placeholder="Maximum Price"

                            onChange={
                                handleChange
                            }

                        />

                    </div>


                    {/* Stock */}

                    <input

                        type="number"

                        name="stock"

                        value={
                            product.stock
                        }

                        placeholder="Stock Quantity"

                        onChange={
                            handleChange
                        }

                    />


                    {/* Image */}

                    <input

                        type="file"

                        onChange={(e) =>
                            setImage(
                                e.target.files[0]
                            )
                        }

                    />


                    <button type="submit">
                        {mainCategory === "2"
                        ? "Save Service"
                        : "Save Product"}
                        </button>


                </form>


            </div>


        </div>

    );

}


export default AddProduct;

