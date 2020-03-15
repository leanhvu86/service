
module.exports = app => {
  const ingredients = require("../controllers/ingredient/ingredient");
  var VerifyToken = require(__root + 'auth/VerifyToken');
  app.post("/createIngredient",VerifyToken, ingredients.createIngredient);

  app.post("/deleteIngredient",VerifyToken, ingredients.deleteIngredient);
  app.get("/getIngredients", ingredients.getIngredients);
  app.get("/findIngredient", ingredients.findIngredient);
};
