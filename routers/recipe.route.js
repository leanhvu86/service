
module.exports = (app) => {
    const RecipeRouter = require('../controllers/recipe/recipe');

    app.get('/recipes', RecipeRouter.getRecipes)
    app.get('/findRecipe/:id', RecipeRouter.findRecipe)
    app.post('/createRecipe', RecipeRouter.createRecipe)
    app.post('/createMultipleRecipe', RecipeRouter.createMultiple)
}

