
module.exports = app => {
  const summary = require("../controllers/summary/summary");
  require(__root + 'auth/VerifyToken');
  app.post("/addSummary",summary.createSummary);
  app.post("/getSummary", summary.getSummarys);
};
