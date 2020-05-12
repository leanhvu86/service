
module.exports = app => {
  const comments = require("../controllers/comment/comment");
  var VerifyToken = require(__root + 'auth/VerifyToken');

  var VerifyRoleByToken = require(__root + 'auth/VerifyRoleByToken');
  var VerifyUserByToken = require(__root + 'auth/VerifyUserByToken');
  app.post("/addComment",VerifyUserByToken,comments.createComment);

  app.post("/deleteComment", VerifyToken,comments.deleteComment);
  app.get("/getComments", comments.getComments);
  app.get("/findComment", comments.findComment);
};
