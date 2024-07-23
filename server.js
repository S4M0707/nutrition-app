import express from "express";
import cors from "cors";
import foodRouter from "./routes/foods.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/nutrition_app/v1/foods", foodRouter);
app.use("*", (req, res) => 
    res.status(404).json({error: "not found"})
);

export default app;