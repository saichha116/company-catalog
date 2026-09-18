import { useNavigate } from "react-router-dom";

function AdminTest() {
    const navigate = useNavigate();

    const adminUser = JSON.parse(
        localStorage.getItem("adminUser")
    );

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#1f1f1f",
                fontFamily: "Arial"
            }}
        >
            <div
                style={{
                    background: "white",
                    padding: "50px",
                    borderRadius: "15px",
                    width: "450px",
                    textAlign: "center",
                    boxShadow: "0 15px 40px rgba(0,0,0,0.3)"
                }}
            >
                <h1>🎉 Admin Login Successful!</h1>

                <p style={{ color: "#555" }}>
                    Your admin authentication is working correctly.
                </p>

                {adminUser && (
                    <div style={{ marginTop: "25px" }}>
                        <p>
                            <strong>Name:</strong>{" "}
                            {adminUser.full_name}
                        </p>

                        <p>
                            <strong>Email:</strong>{" "}
                            {adminUser.email}
                        </p>

                        <p>
                            <strong>Role:</strong>{" "}
                            {adminUser.role}
                        </p>
                    </div>
                )}

                <button
                    onClick={() => navigate("/admin-login")}
                    style={{
                        marginTop: "25px",
                        padding: "12px 25px",
                        border: "none",
                        borderRadius: "8px",
                        background: "#111",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}
                >
                    Back to Admin Login
                </button>
            </div>
        </div>
    );
}

export default AdminTest;