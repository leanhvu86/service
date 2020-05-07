
module.exports = (app) => {
    const RecipeRouter = require('../controllers/recipe/recipe');
    var VerifyToken = require(__root + 'auth/VerifyToken');
    var VerifyRoleByToken = require(__root + 'auth/VerifyRoleByToken');
    app.get('/recipes', RecipeRouter.getRecipes);
    app.get('/getAllRecipes', RecipeRouter.getAllRecipes);
    app.get('/findRecipe/:id', RecipeRouter.findRecipe);
    app.post('/createRecipe',VerifyToken, RecipeRouter.createRecipe);
    app.post('/acceptRecipe',VerifyRoleByToken,RecipeRouter.acceptRecipe);
    app.get('/getNewRecipes', RecipeRouter.getNewRecipes);
    app.post('/declineRecipe',VerifyRoleByToken, RecipeRouter.declineRecipe);
    app.post('/createMultipleRecipe',VerifyToken, RecipeRouter.createMultiple);
};

