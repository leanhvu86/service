
module.exports = app => {
  const comments = require("../controllers/comment/comment");
  var VerifyToken = require(__root + 'auth/VerifyToken');
  app.post("/addComment", VerifyToken,comments.createComment);

  app.post("/removeComment",VerifyToken, comments.deleteComment);
  app.get("/getComment", comments.getComments);
  app.get("/findComment", comments.findComment);
};
