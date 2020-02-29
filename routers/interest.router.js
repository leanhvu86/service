
module.exports = app => {
  const interests = require("../controllers/interest/interest");
  app.post("/likeRecipe", interests.createInterest);

  app.post("/dislikeRecipe", interests.deleteInterest);
  app.get("/getInterest", interests.getInterests);
  app.get("/findInterest", interests.findInterest);
};
