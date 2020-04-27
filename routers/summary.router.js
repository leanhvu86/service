
module.exports = app => {
  const summary = require("../controllers/summary/summary");
  require(__root + 'auth/VerifyToken');

  var VerifyRoleByToken = require(__root + 'auth/VerifyRoleByToken');
  app.post("/addSummary",summary.createSummary);
  app.post("/createFirstSummary",VerifyRoleByToken,summary.createFirstSummary);
  app.post("/getSummary", summary.getSummarys);
};
