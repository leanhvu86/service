
module.exports = (app) => {
    const FoodTypeRouter = require('../controllers/food-type/food-type.js');

    app.get('/foodTypes', FoodTypeRouter.getFoodTypes)
    app.get('/getFoodType', FoodTypeRouter.findFoodType)
    app.post('/createFoodType', FoodTypeRouter.createFoodType)
    app.post('/createMultipleFoodTypes', FoodTypeRouter.createMultiple)
}
