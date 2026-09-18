import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

import { registerUser, googleLoginUser } from "../services/authService";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";


function Register() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState({
        full_name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const getPasswordStrength = (password) => {
        if (password.length < 6) {
            return {
                text: "Weak",
                color: "#dc3545", // Red
            };
        }

        if (password.length < 10) {
            return {
                text: "Medium",
                color: "#fd7e14", // Orange
            };
        }

        return {
            text: "Strong",
            color: "#198754", // Green
        };
    };
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });
    const handleChange = (e) => {
        const { name, value } = e.target;

        let newErrors = { ...errors };

        // Full Name Validation
        if (name === "full_name") {
            if (value.trim() === "") {
                newErrors.full_name = "Full Name is required.";
            } else if (!/^[A-Za-z\s]+$/.test(value)) {
                newErrors.full_name = "Only letters and spaces are allowed.";
            } else {
                newErrors.full_name = "";
            }
        }

        // Email Validation
        if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (value.trim() === "") {
                newErrors.email = "Email is required.";
            } else if (!emailRegex.test(value)) {
                newErrors.email = "Please enter a valid email address.";
            } else {
                newErrors.email = "";
            }
        }

        // Phone Validation
        if (name === "phone") {
            if (!/^\d*$/.test(value)) {
                newErrors.phone = "Only numbers are allowed.";
            } else if (value.length > 0 && value.length < 10) {
                newErrors.phone = "Phone number must be 10 digits.";
            } else {
                newErrors.phone = "";
            }
        }

        // Password Validation
        if (name === "password") {
            if (value.length < 8) {
                newErrors.password = "Password must be at least 8 characters.";
            } else {
                newErrors.password = "";
            }
        }

        // Confirm Password Validation
        if (name === "confirmPassword") {
            if (value !== formData.password) {
                newErrors.confirmPassword = "Passwords do not match.";
            } else {
                newErrors.confirmPassword = "";
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
        if (formData.phone.length !== 10) {
            toast.error("Phone number must be exactly 10 digits");
            return;
        }

        setLoading(true);

        if (formData.password.length < 8) {
            toast.error("Password must contain at least 8 characters");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error("❌ Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const response = await registerUser({
                full_name: formData.full_name,
                email: formData.email,
                phone: formData.phone,
                password: formData.password
            });

            toast.success("🎉 Account Created Successfully!");

            setTimeout(() => {
                navigate("/");
            }, 2000);

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "❌ Registration Failed!"
            );
        }
        finally {
            setLoading(false);
        }
    };

    const handleGoogleRegister = async () => {
        try {
            const result = await signInWithPopup(auth, provider);

            const user = result.user;

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

            toast.success("🎉 Google Registration Successful!");

            setTimeout(() => {
                navigate("/");
            }, 2000);

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "❌ Google Registration Failed!"
            );
        }
    };

    return (
        <div className="register-container">

            <div className="register-card">

                <h1>Create Account</h1>

                <p>Please fill in the details to create your account</p>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label>Full Name</label>

                        <input
                            className={errors.full_name ? "input-error" : ""}
                            type="text"
                            name="full_name"
                            placeholder="Enter your full name"
                            value={formData.full_name}
                            onChange={handleChange}
                            required
                            maxLength={50}
                        />

                        {errors.full_name ? (
                            <small className="error-text">
                                {errors.full_name}
                            </small>
                        ) : (
                            formData.full_name.length >= 3 && (
                                <small className="success-text">
                                    ✓ Valid Name
                                </small>
                            )
                        )}
                    </div>

                    <div className="input-group">
                        <label>Email Address</label>

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
                        <label>Phone Number</label>

                        <input
                            className={errors.phone ? "input-error" : ""}
                            type="tel"
                            name="phone"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            maxLength={10}
                        />

                        {errors.phone ? (
                            <small className="error-text">
                                {errors.phone}
                            </small>
                        ) : (
                            formData.phone.length === 10 && (
                                <small className="success-text">
                                    ✓ Valid Phone Number
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
                            formData.password && (
                                <small
                                    style={{
                                        color: getPasswordStrength(formData.password).color,
                                        fontWeight: "600",
                                    }}
                                >
                                    Password Strength: {getPasswordStrength(formData.password).text}
                                </small>
                            )
                        )}
                    </div>


                    <div className="input-group">
                        <label>Confirm Password</label>

                        <div className="password-field">
                            <input
                                className={errors.confirmPassword ? "input-error" : ""}
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />

                            <button
                                type="button"
                                className="eye-btn"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                            </button>
                        </div>

                        {errors.confirmPassword ? (
                            <small className="error-text">
                                {errors.confirmPassword}
                            </small>
                        ) : (
                            formData.confirmPassword &&
                            formData.confirmPassword === formData.password && (
                                <small className="success-text">
                                    ✓ Passwords Match
                                </small>
                            )
                        )}
                    </div>

                    <button
                        type="submit"
                        className="register-btn"
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>

                    <div className="divider">
                        <hr />
                        <span>OR</span>
                        <hr />
                    </div>

                    <button
                        type="button"
                        className="google-btn"
                        onClick={handleGoogleRegister}
                    >
                        <img
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                            alt="Google"
                        />
                        Continue with Google
                    </button>

                    <p className="login-text">
                        Already have an account?{" "}
                        <span onClick={() => navigate("/")}>
                            Login
                        </span>
                    </p>

                </form>

            </div>

        </div>
    );
}

export default Register;