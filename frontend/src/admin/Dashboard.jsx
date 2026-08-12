import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import { FaBox, FaFolder, FaComments } from "react-icons/fa";
import "./Dashboard.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard(){
    const [dashboardData,setDashboardData] = useState({

    totalProducts:0,
    totalCategories:0

});
useEffect(()=>{

    axios.get("http://localhost:5000/api/dashboard")
    .then((res)=>{

        setDashboardData(res.data);

    })
    .catch((err)=>{

        console.log(err);

    });


},[]);
    return(

        <div className="dashboard-layout">

            <AdminSidebar />

            <div className="dashboard-content">

                <h1>
                    Dashboard
                </h1>

                <p className="welcome">
                    Welcome Admin 👋
                </p>

                <div className="dashboard-cards">

                    <div className="dashboard-card">

                        <FaBox />

                        <div>
                            <h3>Total Products</h3>
                            <p>{dashboardData.totalProducts}</p>
                        </div>

                    </div>

                    <div className="dashboard-card">

                        <FaFolder />

                        <div>
                            <h3>Total Categories</h3>
                          <p>{dashboardData.totalCategories}</p>
                        </div>

                    </div>

                </div>


            </div>


        </div>

    );

}

export default Dashboard;