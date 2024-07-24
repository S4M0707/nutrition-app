import express from "express";
import FoodList from "../controllers/foodlist.controller.js";

const foodListRouter = express.Router();

foodListRouter.route("/add").post(FoodList.getList);

export default foodListRouter;