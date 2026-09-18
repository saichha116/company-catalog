import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
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

    useEffect(() => {
        axios.get("http://localhost:5000/api/categories")
            .then((res) => {
                console.log("RAW:", res.data);
                const data = Array.isArray(res.data) ? res.data : res.data.data || res.data.categories || [];
                setCategories(data);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        if (!product.category_id) {
            setSubcategories([]);
            return;
        }
        axios.get(`http://localhost:5000/api/subcategories/category/${product.category_id}`)
            .then((res) => {
                const data = Array.isArray(res.data) ? res.data : res.data.data || [];
                setSubcategories(data);
            })
            .catch(() => setSubcategories([]));
    }, [product.category_id]);

    const handleMainCategoryChange = (e) => {
        setMainCategory(e.target.value);
        setProduct({ ...product, category_id: "", subcategory_id: "" });
        setSubcategories([]);
    };

    const handleCategoryChange = (e) => {
        setProduct({ ...product, category_id: e.target.value, subcategory_id: "" });
    };

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(product).forEach(key => formData.append(key, product[key]));
        if (image) formData.append("image", image);

        try {
            await axios.post("http://localhost:5000/api/products", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            alert("Product Added Successfully");
            navigate("/admin/products");
        } catch (error) {
            console.log(error);
            alert("Failed - Backend check karo");
        }
    };

    return (
        <div style={{ background: "white", padding: "25px", borderRadius: "12px", maxWidth: "600px" }}>
            <h1 style={{ fontSize: "22px", marginBottom: "20px" }}>
                {mainCategory === "2" ? "Add Service" : "Add Product"}
            </h1>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <input type="text" name="product_name" value={product.product_name} placeholder="Product Name" onChange={handleChange} required style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ddd" }} />

                <select value={mainCategory} onChange={handleMainCategoryChange} required style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ddd" }}>
                    <option value="">Select Main Category</option>
                    <option value="1">Products</option>
                    <option value="2">Services</option>
                </select>

                {/* FIXED: Show all categories, no filter */}
                {mainCategory && (
                    <select name="category_id" value={product.category_id} onChange={handleCategoryChange} required style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ddd" }}>
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat._id || cat.category_id} value={cat._id || cat.category_id}>
                                {cat.category_name || cat.name}
                            </option>
                        ))}
                    </select>
                )}

                <textarea name="description" value={product.description} placeholder="Description" onChange={handleChange} style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ddd" }} />

                {product.category_id && subcategories.length > 0 && (
                    <select name="subcategory_id" value={product.subcategory_id} onChange={handleChange} style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ddd" }}>
                        <option value="">Select Subcategory</option>
                        {subcategories.map((sub) => (
                            <option key={sub._id || sub.subcategory_id} value={sub._id || sub.subcategory_id}>
                                {sub.subcategory_name || sub.name}
                            </option>
                        ))}
                    </select>
                )}

                {product.category_id && subcategories.length === 0 && (
                    <small style={{ color: "#888" }}>No subcategories for this category - you can save without it</small>
                )}

                <div style={{ display: "flex", gap: "10px" }}>
                    <input type="number" name="min_price" value={product.min_price} placeholder="Min Price" onChange={handleChange} style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ddd", flex: 1 }} />
                    <input type="number" name="max_price" value={product.max_price} placeholder="Max Price" onChange={handleChange} style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ddd", flex: 1 }} />
                </div>

                <input type="number" name="stock" value={product.stock} placeholder="Stock" onChange={handleChange} style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ddd" }} />
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />

                <button type="submit" style={{ background: "#2563eb", color: "white", padding: "12px", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}>
                    {mainCategory === "2" ? "Save Service" : "Save Product"}
                </button>
            </form>
        </div>
    );
}
export default AddProduct;