
module.exports = (app) => {
    const RecipeRouter = require('../controllers/recipe/recipe');
    var VerifyToken = require(__root + 'auth/VerifyToken');
    app.get('/recipes', RecipeRouter.getRecipes)
    app.get('/getAllRecipes', RecipeRouter.getAllRecipes)
    app.get('/findRecipe/:id', RecipeRouter.findRecipe)
    app.post('/createRecipe',VerifyToken, RecipeRouter.createRecipe)
    app.post('/acceptRecipe',/*VerifyToken,*/ RecipeRouter.acceptRecipe)

    app.post('/declineRecipe',/*VerifyToken, */RecipeRouter.declineRecipe)
    app.post('/createMultipleRecipe',VerifyToken, RecipeRouter.createMultiple)
}

