import mongodb from 'mongodb';

let foodLists;

export default class FoodListDAO {
    static async injectDB(conn) {
        if (foodLists) return;
        try {
            foodLists = await conn.db("Auth").collection("foodLists");
        } catch (e) {
            console.error(`Unable to establish collection handles in FoodListDAO: ${e}`);
        }
    }

    static async addFoodToList(userId, foodId) {
        try {
            const result = await foodLists.updateOne(
                { userId: new mongodb.ObjectId(userId) },
                { $push: { foods: new mongodb.Int32(foodId) } },
                { upsert: true }
            );
            return { success: true, foodId: foodId };
        } catch (e) {
            console.error(`Error adding food to list: ${e}`);
            return { error: e };
        }
    }

    static async removeFoodFromList(userId, foodId) {
        try {
            const result = await foodLists.updateOne(
                { userId: new mongodb.ObjectId(userId) },
                { $pull: { foods: foodId } }
            );
            return { success: true };
        } catch (e) {
            console.error(`Error removing food from list: ${e}`);
            return { error: e };
        }
    }

    static async getFoodItemsByUserId(userId) {
        try {
            const foodList = await foodLists.findOne({ userId: new mongodb.ObjectId(userId) });
            return foodList ? foodList.foods : [];
        } catch (e) {
            console.error(`Error getting food items by user ID: ${e}`);
            return { error: e };
        }
    }
}
