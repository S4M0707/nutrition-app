import express from "express";
import Foods from "../controllers/foods.controller.js"

const foodRouter = express.Router();

foodRouter.route("/list").get(Foods.getList);
foodRouter.route("/search/:name").get(Foods.getFoodByName);
foodRouter.route("/select/:id").get(Foods.getFoodById);

export default foodRouter;