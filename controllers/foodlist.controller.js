import FoodListDAO from "../dao/foodlist.dao.js";

export default class FoodList {
    static async addFoodItem(req, res, next) {
        try {
            const userId = req.user._id;
            const foodId = req.body.foodId;

            const result = await FoodListDAO.addFoodToList(userId, foodId);

            if (result.error) {
                res.status(500).json({ error: result.error });
                return;
            }

            res.status(201).json({ success: true });
        } catch (e) {
            res.status(500).json({ error: "Error in adding food item" });
        }
    }

    static async deleteFoodItem(req, res, next) {
        try {
            const userId = req.user._id;
            const foodId = req.params.id;

            const result = await FoodListDAO.removeFoodFromList(userId, foodId);

            if (result.error) {
                res.status(500).json({ error: result.error });
                return;
            }

            res.status(200).json({ success: true });
        } catch (e) {
            res.status(500).json({ error: "Error in deleting food item" });
        }
    }

    static async getAllFoodItems(req, res, next) {
        try {
            const userId = req.user._id;
            const foodItems = await FoodListDAO.getFoodItemsByUserId(userId);
            res.json(foodItems);
        } catch (e) {
            res.status(500).json({ error: "Error in getting food items" });
        }
    }
}
