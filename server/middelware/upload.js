const multer = require("multer");
const path = require("path");
const fs = require("fs"); // FIX 1: Added fs

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // FIX 2: Use absolute path + auto-create
        const uploadPath = path.join(__dirname, "../uploads");

        // This creates folder if not exists - fixes your ENOENT error
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
            console.log("Created uploads folder at:", uploadPath);
        }

        cb(null, uploadPath);
    },

    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "-");
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    }
    cb(new Error("Only image files are allowed"));
};

const upload = multer({
    storage,
    fileFilter
});

module.exports = upload;