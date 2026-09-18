import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = () => {
    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            <AdminSidebar />
            <div style={{ flex: 1, marginLeft: "250px", padding: "24px", background: "#f8f9fa", minHeight: "100vh" }}>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;