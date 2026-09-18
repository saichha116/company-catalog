import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "../styles/ForgotPassword.css";

function ForgotPassword() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const getPasswordStrength = (password) => {
        if (password.length < 6)
            return { text: "Weak", color: "#dc3545" };

        if (password.length < 10)
            return { text: "Medium", color: "#fd7e14" };

        return { text: "Strong", color: "#198754" };
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        let newErrors = { ...errors };

        if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(value))
                newErrors.email = "Please enter a valid email.";
            else
                newErrors.email = "";
        }

        if (name === "password") {
            if (value.length < 8)
                newErrors.password =
                    "Password must be at least 8 characters.";
            else
                newErrors.password = "";
        }

        if (name === "confirmPassword") {
            if (value !== formData.password)
                newErrors.confirmPassword =
                    "Passwords do not match.";
            else
                newErrors.confirmPassword = "";
        }

        setErrors(newErrors);

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);

        setTimeout(() => {
            toast.success("Password Reset Successfully!");

            setLoading(false);

            navigate("/");
        }, 2000);
    };

    return (
        <div className="forgot-container">

            <div className="forgot-card">

                <h1>Forgot Password</h1>

                

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

                        {errors.email && (
                            <small className="error-text">
                                {errors.email}
                            </small>
                        )}
                    </div>

                    <div className="input-group">
                        <label>New Password</label>

                        <div className="password-field">
                            <input
                                className={errors.password ? "input-error" : ""}
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter new password"
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
                                        fontWeight: "600"
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
                                placeholder="Confirm new password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />

                            <button
                                type="button"
                                className="eye-btn"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
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
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>

                    <p
                        className="login-text"
                        onClick={() => navigate("/")}
                        style={{ cursor: "pointer" }}
                    >
                        ← Back to Login
                    </p>

                </form>

            </div>

        </div>
    );
}

export default ForgotPassword;