import dotenv from 'dotenv';
import jsonwebtoken from 'jsonwebtoken';
import UserDAO from "../dao/user.dao.js";

dotenv.config();

export default class Auth {
    static async register(req, res, next) {
        try {
            const username = req.body.username;
            const email = req.body.email;
            const password = req.body.password;

            const existingUser = await UserDAO.findUserByEmail(email);

            if (existingUser) {
                return res.status(400).json(existingUser);
            }

            const user = await UserDAO.createUser(username, email, password);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }

    static async login(req, res, next) {
        try {
            const email = req.body.email;
            const password = req.body.password;

            const user = await UserDAO.findUserByEmail(email);
        
            if (!user) {
              return res.status(400).json({ error: 'Invalid email' });
            }

            const isMatch = await UserDAO.matchPassword(password, user);
                
            if (!isMatch) {
              return res.status(400).json({ error: 'Invalid password' });
            }
        
            const payload = { userId: user._id };
            const token = jsonwebtoken.sign(payload, process.env.JWT_ACCESS_TOKEN);
        
            res.json({ token: token });
        } catch (e) {
            res.status(500).json({ error: 'Server error' });
        }
    }
}