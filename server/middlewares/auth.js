// middlewares/auth.js
const jwt = require('jsonwebtoken');

const requireAdmin = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        if (!decoded.isAdmin) {
            return res.status(403).json({ error: 'Access denied, admin only' });
        }

        req.user = decoded;
        next();
    });
};

module.exports = { requireAdmin };
