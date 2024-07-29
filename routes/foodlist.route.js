import express from "express";
import FoodList from "../controllers/foodlist.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";

const foodListRouter = express.Router();

foodListRouter.route("/").get(AuthMiddleware.middleware, FoodList.getAllFoodItems);
foodListRouter.route("/").post(AuthMiddleware.middleware, FoodList.addFoodItem);
foodListRouter.route("/:id").delete(AuthMiddleware.middleware, FoodList.deleteFoodItem);

export default foodListRouter;