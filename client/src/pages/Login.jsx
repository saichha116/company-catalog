import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { loginUser, googleLoginUser } from "../services/authService";
import { toast } from "react-toastify";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import "../styles/Login.css";

function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        let newErrors = { ...errors };

        if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (value.trim() === "") {
                newErrors.email = "Email is required.";
            } else if (!emailRegex.test(value)) {
                newErrors.email = "Please enter a valid email.";
            } else {
                newErrors.email = "";
            }
        }

        if (name === "password") {
            if (value.length < 8) {
                newErrors.password = "Password must be at least 8 characters.";
            } else {
                newErrors.password = "";
            }
        }

        setErrors(newErrors);

        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await loginUser({
                email: formData.email,
                password: formData.password
            });

            toast.success("🎉 Login Successful! Welcome back.");

            // Save JWT Token
            localStorage.setItem("token", response.data.token);

            // Save user details
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            setTimeout(() => {
                navigate("/");
            }, 2000);

        } catch (error) {
            toast.error(
                error.response?.data?.message || "❌ Login Failed!"
            );
        }
        finally {
            setLoading(false);
        }
    };
    const handleGoogleLogin = async () => {
        try {
            // Sign in with Google
            const result = await signInWithPopup(auth, provider);

            const user = result.user;

            // Send Google user to our backend
            const response = await googleLoginUser({
                full_name: user.displayName,
                email: user.email,
                phone: null,
                password: null,
                google_id: user.uid
            });

            // Save JWT token
            localStorage.setItem("token", response.data.token);

            // Save user details
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            toast.success("🎉 Google Login Successful!");

            // Go to home page
            setTimeout(() => {
                navigate("/");
            }, 1500);

        } catch (error) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "❌ Google Login Failed!"
            );
        }
    };

    return (
        <div className="login-container">

            <div className="login-card">

                <h1>Welcome</h1>

                <p>Sign into your account</p>

                <div className="tab-buttons">
                    <button className="active">Sign In</button>
                    <button
                        className="inactive"
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </button>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label>Email</label>

                        <input
                            className={errors.email ? "input-error" : ""}
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        {errors.email ? (
                            <small className="error-text">
                                {errors.email}
                            </small>
                        ) : (
                            formData.email.includes("@") &&
                            formData.email.includes(".") && (
                                <small className="success-text">
                                    ✓ Valid Email
                                </small>
                            )
                        )}
                    </div>
                    <div className="input-group">
                        <label>Password</label>

                        <div className="password-field">
                            <input
                                className={errors.password ? "input-error" : ""}
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                            <button
                                type="button"
                                className="eye-btn"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                            </button>
                        </div>

                        {errors.password ? (
                            <small className="error-text">
                                {errors.password}
                            </small>
                        ) : (
                            formData.password.length >= 8 && (
                                <small className="success-text">

                                </small>
                            )
                        )}
                    </div>
                    <div className="login-options">
                        <label>
                            <input type="checkbox" />
                            Remember Me
                        </label>

                        <span
                            className="forgot-password"
                            onClick={() => navigate("/forgot-password")}
                        >
                            Forgot Password?
                        </span>
                    </div>
                    <button
                        type="submit"
                        className="login-btn"
                        disabled={loading}
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>

                    <div className="divider">
                        <hr />
                        <span>OR</span>
                        <hr />
                    </div>

                    <button
                        type="button"
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <img
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                            alt="Google"
                        />
                        Continue with Google
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;