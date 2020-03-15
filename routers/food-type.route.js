
module.exports = (app) => {
    const FoodTypeRouter = require('../controllers/food-type/food-type.js');
    const VerifyToken = require(__root + 'auth/VerifyToken');

    app.get('/foodTypes', FoodTypeRouter.getFoodTypes)
    app.get('/getFoodType', FoodTypeRouter.findFoodType)
    app.post('/createFoodType',VerifyToken, FoodTypeRouter.createFoodType)
    app.post('/createMultipleFoodTypes',VerifyToken, FoodTypeRouter.createMultiple)
}
