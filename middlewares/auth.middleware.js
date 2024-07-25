import jsonwebtoken from "jsonwebtoken";
import dotenv from 'dotenv';
import UserDAO from "../dao/user.dao.js";

dotenv.config();

export default class AuthMiddleware {
    static async middleware(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token == null) {
            return res.sendStatus(401).json({ error: 'No token, authorization denied' });
        }

        try {
            const decoded = jsonwebtoken.verify(token, process.env.JWT_ACCESS_TOKEN);
            req.user = await UserDAO.findUserById(decoded.userId);
            next();
        } catch (error) {
            res.status(401).json({ error: 'Token is not valid' });
        }
    }
}