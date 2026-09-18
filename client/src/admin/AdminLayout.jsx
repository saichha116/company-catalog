import AdminSidebar from "../components/AdminSidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
    return (
        <div style={{ display: "flex", minHeight: "100vh", background: "#f5f7fb" }}>
            <AdminSidebar />
            <div style={{ marginLeft: "240px", flex: 1, padding: "30px", width: "calc(100% - 240px)" }}>
                <Outlet />
            </div>
        </div>
    );
}