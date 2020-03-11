
module.exports = app => {
  const comments = require("../controllers/comment/comment");
  app.post("/addComment", comments.createComment);

  app.post("/removeComment", comments.deleteComment);
  app.get("/getComment", comments.getComments);
  app.get("/findComment", comments.findComment);
};
