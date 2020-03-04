
module.exports = app => {
  const ingredients = require("../controllers/ingredient/ingredient");
  app.post("/createIngredient", ingredients.createIngredient);

  app.post("/deleteIngredient", ingredients.deleteIngredient);
  app.get("/getIngredients", ingredients.getIngredients);
  app.get("/findIngredient", ingredients.findIngredient);
};
