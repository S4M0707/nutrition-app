import express from "express";
import cors from "cors";
import foodRouter from "./routes/foods.route.js";
import foodListRouter from "./routes/foodlist.route.js";
import authRouter from "./routes/auth.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/nutrition_app/v1/auth", authRouter)
app.use("/nutrition_app/v1/food", foodRouter);
app.use("/nutrition_app/v1/foodlist", foodListRouter);
app.use("*", (req, res) =>
    res.status(404).json({ error: "not found" })
);

export default app;