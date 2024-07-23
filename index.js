import app from "./server.js";
import mongodb from "mongodb";
import dotenv from 'dotenv';

dotenv.config();
const uri = process.env.MONGODB_URI;
const port = process.env.PORT;

const MongoClient = mongodb.MongoClient;

MongoClient.connect(uri, {
    maxPoolSize: 100,
    wtimeoutMS: 2500,
    useNewUrlParser: true
}).catch(err => {
    console.error(err);
    process.exit(1);
}).then(async client => {
    app.listen(port, () => {
        console.log(`Listening port: ${port}`)
    })
});