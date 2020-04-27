
module.exports = app => {
  const interests = require("../controllers/interest/interest");
  var VerifyToken = require(__root + 'auth/VerifyToken');
  var VerifyUserByToken = require(__root + 'auth/VerifyUserByToken');
  app.post("/likeRecipe",VerifyUserByToken,interests.createInterest);

  app.post("/dislikeRecipe",VerifyUserByToken,interests.deleteInterest);
  app.get("/getInterest", interests.getInterests);
  app.post("/findInterest", interests.findInterest);
  app.post("/findInterestGallery", interests.findInterest)
};
