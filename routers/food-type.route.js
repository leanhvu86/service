
module.exports = (app) => {
    const FoodTypeRouter = require('../controllers/food-type/food-type.js');
    var VerifyToken = require(__root + 'auth/VerifyToken');

    var VerifyRoleByToken = require(__root + 'auth/VerifyRoleByToken');
    app.get('/foodTypes', FoodTypeRouter.getFoodTypes)
    app.get('/getFoodType', FoodTypeRouter.findFoodType)
    app.post('/createFoodType',VerifyToken, VerifyRoleByToken,FoodTypeRouter.createFoodType)
    app.post('/createMultipleFoodTypes',VerifyToken, VerifyRoleByToken,FoodTypeRouter.createMultiple)
}
