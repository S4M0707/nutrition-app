import dotenv from 'dotenv';

dotenv.config();
const API_KEY = process.env.FDC_API_KEY;
const API_LIST_LINK = `https://api.nal.usda.gov/fdc/v1/foods/list?api_key=${API_KEY}`;
const API_SEARCH_LINK = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${API_KEY}&query=`;

export default class Foods {
    static async getList(req, res) {
        try {
            let response = await fetch(API_LIST_LINK);
            
            if (!response.ok) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            let foods = await response.json();
            res.json(foods.slice(1));
        } catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async getFoodByName(req, res) {
        try {
            let name = req.params.name;
            let response = await fetch(API_SEARCH_LINK + encodeURIComponent(name));
            
            if (!response.ok) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            let foods = await response.json();
            res.json(foods['foods']);
        } catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async getFoodById(req, res) {
        try {
            let id = req.params.id;
            const API_FOOD_ELEMENT = `https://api.nal.usda.gov/fdc/v1/food/${id}?api_key=${API_KEY}`;

            let response = await fetch(API_FOOD_ELEMENT);
            
            if (!response.ok) {
                res.status(404).json({ error: "Not found" });
                return;
            }
            let food = await response.json();
            res.json(food);
        } catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({ error: e });
        }
    }
}