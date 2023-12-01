import 'dotenv/config';
import jwt from 'jsonwebtoken';

// verify access token
const verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Missing access token' });
    }

    jwt.verify(token, process.env.JWT_SECRET_ACCESS, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden: Invalid access token' });
        }
        req.user = { ...user };
        console.log("user from access token", user);
        next();
    });
};

// verify refresh token
const verifyRefreshToken = (req, res, next) => {
    const cookie = req.headers.cookie;
    const refreshToken = cookie && cookie.split("=")[1];

    if (!refreshToken) {
        return res.status(401).json({ error: 'expired' });
    }

    jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'expired' });
            console.log("expired ")
        }
        req.user = { ...req.user, username: user.username };
        next();
    });
};

export { verifyAccessToken, verifyRefreshToken };
