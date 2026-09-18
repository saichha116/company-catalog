
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import "./Products.css";

function Products() {

    const [products, setProducts] = useState([]);


    useEffect(() => {

        axios.get("http://localhost:5000/api/products")

            .then((res) => {

                setProducts(res.data);

            })

            .catch((err) => {

                console.log(err);

            });

    }, []);


    const handleDelete = (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );


        if (!confirmDelete) {

            return;

        }


        axios.delete(
            `http://localhost:5000/api/products/${id}`
        )

            .then(() => {

                setProducts(
                    products.filter(
                        (product) =>
                            product.product_id !== id
                    )
                );

            })

            .catch((err) => {

                console.log(err);

            });

    };


    return (

        <div className="dashboard-layout">


            <AdminSidebar />


            <div className="dashboard-content">


                <div className="product-header">


                    <h1>
                        Product & Service Management
                    </h1>


                    <Link to="/admin/add-product">

                        <button className="add-btn">

                            + Add Product / Service

                        </button>

                    </Link>


                </div>


                <table className="product-table">


                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Image</th>

                            <th>Name</th>

                            <th>Category</th>

                            <th>Subcategory</th>

                            <th>Price Range</th>

                            <th>Stock</th>

                            <th>Actions</th>

                        </tr>

                    </thead>


                    <tbody>


                        {products.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="8"
                                    style={{
                                        textAlign: "center"
                                    }}
                                >

                                    No products or services found.

                                </td>

                            </tr>

                        ) : (


                            products.map((product) => (


                                <tr
                                    key={
                                        product.product_id
                                    }
                                >


                                    {/* ID */}

                                    <td>

                                        {
                                            product.product_id
                                        }

                                    </td>


                                    {/* Image */}

                                    <td>


                                        {product.image ? (

                                            <img

                                                src={`http://localhost:5000/uploads/${product.image}`}

                                                width="50"

                                                height="50"

                                                alt={
                                                    product.product_name
                                                }

                                                style={{
                                                    objectFit:
                                                        "cover"
                                                }}

                                            />

                                        ) : (

                                            "No Image"

                                        )}


                                    </td>


                                    {/* Name */}

                                    <td>

                                        {
                                            product.product_name
                                        }

                                    </td>


                                    {/* Category */}

                                    <td>

                                        {
                                            product.category_name
                                        }

                                    </td>


                                    {/* Subcategory */}

                                    <td>

                                        {
                                            product.subcategory_name
                                                || "—"
                                        }

                                    </td>


                                    {/* Price */}

                                    <td>

                                        ₹
                                        {
                                            product.min_price
                                        }
                                        {" - "}
                                        ₹
                                        {
                                            product.max_price
                                        }

                                    </td>


                                    {/* Stock */}

                                    <td>

                                        {
                                            product.stock
                                        }

                                    </td>


                                    {/* Actions */}

                                    <td>


                                        <Link
                                            to={`/admin/edit-product/${product.product_id}`}
                                        >

                                            <button

                                                type="button"

                                                className="edit-btn"

                                            >

                                                Edit

                                            </button>

                                        </Link>


                                        <button

                                            className="delete-btn"

                                            onClick={() =>
                                                handleDelete(
                                                    product.product_id
                                                )
                                            }

                                        >

                                            Delete

                                        </button>


                                    </td>


                                </tr>

                            ))

                        )}


                    </tbody>


                </table>


            </div>


        </div>

    );

}


export default Products;

