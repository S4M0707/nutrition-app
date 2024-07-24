import UserDAO from "../dao/user.dao.js";

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

            res.json(isMatch);
        
            // const payload = { userId: user._id };
            // const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        
            // res.json({ token });
        } catch (e) {
            res.status(500).json({ error: 'Server error' });
        }
    }
}