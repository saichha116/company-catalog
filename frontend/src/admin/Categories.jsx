import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import "./Categories.css";
import { Link } from "react-router-dom";

function Categories() {


    const [categories,setCategories] = useState([]);



    useEffect(()=>{

        fetchCategories();

    },[]);



    const fetchCategories = ()=>{

        axios.get("http://localhost:5000/api/categories")
        .then((res)=>{

            setCategories(res.data);

        })
        .catch((err)=>{

            console.log(err);

        });

    };

    const deleteCategory = (id)=>{

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this category?"
        );

        if(!confirmDelete){
            return;
        }
        axios.delete(
            `http://localhost:5000/api/categories/${id}`
        )
        .then(()=>{

            alert("Category deleted successfully");

            fetchCategories();

        })
        .catch((err)=>{

            console.log(err);

        });

    };
    return (

        <div className="dashboard-layout">
            <AdminSidebar />
            <div className="dashboard-content">
                <div className="category-top">
                    <h1>
                        Category Management
                    </h1>

                    <Link to="/admin/add-category">
    <button className="add-btn">
        + Add Category
    </button>
</Link>
                </div>

                <table className="category-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Category Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>

                    </thead>

                    <tbody>
                    {
                        categories.map((category)=>(

                            <tr key={category.category_id}>

                                <td>
                                    {category.category_id}
                                </td>

                                <td>
                                    {
                                        category.category_image
                                        ?
                                        <img
                                            src={`http://localhost:5000/uploads/${category.category_image}`}
                                            width="50"
                                        />
                                        :
                                        "No Image"
                                    }
                                </td>
                                <td>
                                    {category.category_name}
                                </td>
                                <td>
                                    {category.description}
                                </td>
                                <td>
                                    <Link to={`/admin/edit-category/${category.category_id}`}>
                              <button className="edit-btn">
                                            Edit
                                </button>
                            </Link>
                                    <button
                                        className="delete-btn"
                                        onClick={()=>
                                            deleteCategory(
                                                category.category_id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>

                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default Categories;