const jwt = require("jsonwebtoken")
require("dotenv").config()

const verifyUser = (req, res, next) => {
    const token = req.headers.authorization;

    try {
        if (token) {
            const decoded = jwt.verify(token, process.env.key);
            if (decoded) {
                next();
            } else {
                res.status(401).json({ success: false, message: "Please Login First" });
            }
        } else {
            res.status(401).json({ success: false, message: "Please Login First" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = verifyUser;