import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import models from "../models/index.js";
import { error, success, signAccessToken, signRefreshToken } from "../utils/index.js";

class UserController {
    // add user
    addUser = async (req, res) => {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.send(error("Please provide all the required fields!"));
            }
            if (username) {
                const userFound = await models.users.findOne({ where: { username } });
                if (userFound) {
                    return res.send(error("Username is already taken"));
                }
            }
            let passwordHash = "";
            passwordHash = await bcrypt.hash(password, 10);
            console.log("hashed pass: ", passwordHash);
            const createdUser = await models.users.create({
                username,
                password: passwordHash,
            });
            if (createdUser) {
                return res.send(
                    success({
                        user: createdUser,
                    })
                );
            }
        } catch (e) {
            return res.send(error(e.message));
        }
    };

    // login user and return jwt token
    loginUser = async (req, res) => {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.send(error('Please provide a username and password'));
        }
        try {
            const foundUser = await models.users.findOne({ where: { username } });
            if (!foundUser) {
                return res.send(error('User not found'));
            }
            const isPasswordMatched = await bcrypt.compare(password, foundUser.password);
            if (!isPasswordMatched) {
                return res.send(error('Incorrect password'));
            }
            // generate jwt refresh and access token
            const refreshToken = signRefreshToken(username);
            const accessToken = signAccessToken(foundUser.dataValues.id, username);

            // set refresh token as http only cookie
            res.cookie('refreshToken', refreshToken, { httpOnly: true });

            delete foundUser.dataValues.password;
            return res.send(success({
                user: foundUser,
                accessToken
            }));
        } catch (e) {
            return res.send(error(e.message));
        }
    };

    // get new access token using refresh token
    getNewAccessToken = async (req, res) => {
        // get token from header refresh token
        const cookie = req.headers.cookie;
        if (!cookie) {
            return res.send(error('Cookie is not provided'));
        }
        const token = cookie.split("=")[1];
        if (!token) {
            return res.send(error('Token not provided'));
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_REFRESH);
            if (!decoded) {
                return res.send(error('Invalid token'));
            }
            const { username } = decoded;
            const foundUser = await models.users.findOne({ where: { username } });
            if (!foundUser) {
                return res.send(error('User not found'));
            }
            const accessToken = signAccessToken(foundUser.dataValues.id, username);
            return res.send(success({ accessToken }));
        } catch (e) {
            return res.send(error(e.message));
        }
    };

}


export default UserController