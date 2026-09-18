const db = require("../config/db");
const bcrypt = require("bcrypt");

const createAdmin = async () => {
    try {
        const full_name = "Stationery Store Admin";
        const email = "admin@gmail.com";
        const phone = "9168819091";
        const password = "Admin@12345";

        // Check if admin already exists
        const [existingAdmin] = await db.execute(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (existingAdmin.length > 0) {
            console.log("Admin account already exists.");

            // Make sure this account has admin role
            await db.execute(
                "UPDATE users SET role = 'admin' WHERE email = ?",
                [email]
            );

            console.log("Admin role verified.");
            process.exit(0);
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create admin account
        await db.execute(
            `INSERT INTO users
            (full_name, email, phone, password, role)
            VALUES (?, ?, ?, ?, 'admin')`,
            [
                full_name,
                email,
                phone,
                hashedPassword
            ]
        );

        console.log("=================================");
        console.log("ADMIN ACCOUNT CREATED SUCCESSFULLY");
        console.log("=================================");
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Role: admin");
        console.log("=================================");

        process.exit(0);

    } catch (error) {
        console.error("Error creating admin:", error);
        process.exit(1);
    }
};

createAdmin();