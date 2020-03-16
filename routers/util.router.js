
module.exports = app => {
  const untils = require("../controllers/utils/util");
  var VerifyToken = require(__root + 'auth/VerifyToken');
  app.post("/sendMail",untils.sendMail);
};
