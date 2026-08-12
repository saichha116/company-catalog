import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import "./Categories.css";

function EditCategory(){

    const { id } = useParams();
    const navigate = useNavigate();
    const [category,setCategory] = useState({

        category_name:"",
        description:""

    });

    useEffect(()=>{

        axios.get("http://localhost:5000/api/categories")
        .then((res)=>{


            const data = res.data.find(
                (cat)=>cat.category_id === Number(id)
            );

            setCategory(data);

        })
        .catch((err)=>{

            console.log(err);

        });

    },[id]);

    const handleChange=(e)=>{

        setCategory({

            ...category,

            [e.target.name]:e.target.value

        });

    };

    const handleSubmit=(e)=>{

        e.preventDefault();


        axios.put(
            `http://localhost:5000/api/categories/${id}`,
            category
        )
        .then(()=>{

            alert("Category updated successfully");

            navigate("/admin/categories");

        })
        .catch((err)=>{

            console.log(err);

        });

    };

    return(

        <div className="dashboard-layout">

            <AdminSidebar />

            <div className="dashboard-content">

                <h1>
                    Edit Category
                </h1>

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
                    />

                    <textarea
                        name="description"
                        value={category.description || ""}
                        placeholder="Description"
                        onChange={handleChange}
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