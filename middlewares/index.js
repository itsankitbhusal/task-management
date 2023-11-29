import 'dotenv/config';
import jwt from 'jsonwebtoken';

// verify access token
const verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) { return res.sendStatus(401); }
    jwt.verify(token, process.env.JWT_SECRET_ACCESS, (err, user) => {
        if (err) { return res.sendStatus(403); }
        req.user = { ...user };
        console.log("user from access token", user);
        next();
    }
    );
};

// verify refresh token
const verifyRefreshToken = (req, res, next) => {
    const refreshToken = req.headers.refresh;
    if (!refreshToken) { return res.sendStatus(401); }
    jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH, (err, user) => {
        if (err) { return res.sendStatus(403); }
        req.user = { ...req.user, username: user.username };
        console.log("user from refresh token", user);
        next();
    }
    );
};

export { verifyAccessToken, verifyRefreshToken };