import express from "express";
import FoodList from "../controllers/foodlist.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";

const foodListRouter = express.Router();

foodListRouter.route("/add").post(AuthMiddleware.middleware, (req, res) => {
    const username = req.body.username;
    res.json(req.user);
});

export default foodListRouter;