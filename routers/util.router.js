module.exports = app => {
    const utils = require("../controllers/utils/util");
    const VerifyToken = require(__root + 'auth/VerifyToken');
    app.post("/sendMail", VerifyToken, utils.sendMail);
};
