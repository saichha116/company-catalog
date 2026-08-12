import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./AdminLogin.css";

function AdminLogin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();

        console.log({
            email,
            password
        });

        // Backend login will be connected later
    };


    return (

        <div className="admin-login-container">

            <div className="admin-login-box">

                <h2>Admin Login</h2>


                <form onSubmit={handleLogin}>


                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        required
                    />


                   <div className="password-field">

    <input
        type={showPassword ? "text" : "password"}
        placeholder="Enter Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        required
    />

    <span
        className="password-icon"
        onClick={() => setShowPassword(!showPassword)}
    >
        {
            showPassword 
            ? <FaEyeSlash />
            : <FaEye />
        }
    </span>

</div>


                    <button type="submit">
                        Login
                    </button>


                </form>


            </div>

        </div>

    );
}


export default AdminLogin;