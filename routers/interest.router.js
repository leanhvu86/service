
module.exports = app => {
  const interests = require("../controllers/interest/interest");
  var VerifyToken = require(__root + 'auth/VerifyToken');
  app.post("/likeRecipe",VerifyToken, interests.createInterest);

  app.post("/dislikeRecipe",VerifyToken, interests.deleteInterest);
  app.get("/getInterest", interests.getInterests);
  app.post("/findInterest", interests.findInterest);
  app.post("/findInterestGallery", interests.findInterest)
};
