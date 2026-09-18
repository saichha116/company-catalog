import { NavLink, useNavigate } from "react-router-dom";

export default function AdminSidebar() {
    const linkStyle = ({ isActive }) => ({
        display: "block", padding: "10px 15px", borderRadius: "8px",
        textDecoration: "none", fontSize: "13px",
        background: isActive ? "#2563eb" : "transparent",
        color: isActive ? "white" : "#cbd5e1", marginBottom: "6px"
    });

    return (
        <div style={{ width: "240px", background: "#0f172a", position: "fixed", top: 0, bottom: 0, left: 0, padding: "15px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
                <h2 style={{ color: "white", fontSize: "14px", marginBottom: "25px" }}>Company Catalog</h2>
                <NavLink to="/admin" end style={linkStyle}>Dashboard</NavLink>
                <NavLink to="/admin/categories" style={linkStyle}>Categories</NavLink>
                <NavLink to="/admin/products" style={linkStyle}>Products</NavLink>
            </div>
        </div>
    );
}