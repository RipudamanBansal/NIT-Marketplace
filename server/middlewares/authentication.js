const jwt = require("jsonwebtoken");
const ensureAuthenticated = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized", success: false });
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
        return res.status(403).json({ message: "Forbidden", success: false });
        }
        req.user = decoded;
        next();
    });
    }

module.exports = {ensureAuthenticated};