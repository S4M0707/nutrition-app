import bcryptjs from 'bcryptjs';

export default class UserDAO {
    static user;
    static async injectDB(conn) {
        if (this.user) {
            return
        }
        try {
            this.user = await conn.db("Auth").collection("User")
        } catch (e) {
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }

    static async findUserByEmail(email) {
        try {
            return await this.user.findOne({email: email});
        } catch (e) {
            console.error(`Unable to get email: ${e}`)
            return { error: e }
        }
    }

    static async createUser(username, email, password) {
        try {
            const pass = await bcryptjs.hash(password, 10);
            const obj = {
                username: username,
                email: email,
                password: pass
            };
            console.log("Creating User");
            return await this.user.insertOne(obj);
        } catch (e) {
            return { error: e }
        }
    }

    static async matchPassword(password, user) {
        try {
            return await bcryptjs.compare(password, user.password);
        } catch (e) {
            return { error: e }
        }
    }
}