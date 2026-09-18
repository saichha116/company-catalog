import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddCategory() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        category_name: "",
        description: "",
        main_category_id: "1",
    });
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("category_name", form.category_name);
        formData.append("description", form.description);
        formData.append("main_category_id", form.main_category_id); // FIXED LINE
        if (image) formData.append("category_image", image);

        try {
            await axios.post("http://localhost:5000/api/categories", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Category Added Successfully!");
            navigate("/admin/categories");
        } catch (err) {
            console.log(err);
            alert("Error: " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div style={{ background: "white", padding: "25px", borderRadius: "12px", maxWidth: "600px", margin: "0 auto" }}>
            <h1 style={{ fontSize: "22px", marginBottom: "20px" }}>Add New Category</h1>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <div>
                    <label style={{ fontWeight: "600" }}>Main Category *</label>
                    <select
                        value={form.main_category_id}
                        onChange={(e) => setForm({ ...form, main_category_id: e.target.value })}
                        style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", marginTop: "5px" }}
                    >
                        <option value="1">1 - Products</option>
                        <option value="2">2 - Services</option>
                    </select>
                </div>

                <div>
                    <label style={{ fontWeight: "600" }}>Category Name *</label>
                    <input
                        type="text"
                        required
                        placeholder="e.g. Notebooks, Pens, Printing Service"
                        value={form.category_name}
                        onChange={(e) => setForm({ ...form, category_name: e.target.value })}
                        style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", marginTop: "5px" }}
                    />
                </div>

                <div>
                    <label style={{ fontWeight: "600" }}>Description</label>
                    <textarea
                        placeholder="Enter description"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", marginTop: "5px", minHeight: "80px" }}
                    />
                </div>

                <div>
                    <label style={{ fontWeight: "600" }}>Category Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        style={{ width: "100%", marginTop: "5px" }}
                    />
                </div>

                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <button type="submit" style={{ background: "#2563eb", color: "white", padding: "12px 20px", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}>
                        Save Category
                    </button>
                    <button type="button" onClick={() => navigate("/admin/categories")} style={{ background: "#e5e7eb", padding: "12px 20px", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddCategory;