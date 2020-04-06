
module.exports = app => {
  const summarys = require("../controllers/summary/summary");
  var VerifyToken = require(__root + 'auth/VerifyToken');
  app.post("/addSummary",summarys.createSummary);
  app.post("/getSummary", summarys.getSummarys);
};
