import React from "react";
import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

function AdminSidebar(){

    return(

        <div className="admin-sidebar">

            <h2>
                Company Catalog
            </h2>


            <nav>

                <NavLink to="/admin/dashboard">
                    Dashboard
                </NavLink>

                <NavLink to="/admin/categories">
                    Categories
                </NavLink>

                <NavLink to="/admin/products">
                    Products
                </NavLink>

            </nav>

        </div>
    );

}

export default AdminSidebar;