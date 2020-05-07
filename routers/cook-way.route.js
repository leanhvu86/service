module.exports = (app) => {
    const CookWayRouter = require('../controllers/cook-way/cook-way');
    var VerifyToken = require(__root + 'auth/VerifyToken');

    var VerifyRoleByToken = require(__root + 'auth/VerifyRoleByToken');
    app.get('/cookWays', CookWayRouter.getCookWays);
    app.get('/getCookWay', CookWayRouter.findCookWay);
    app.post('/createCookWay', VerifyRoleByToken,CookWayRouter.createCookWay);
    app.post('/createMultipleCookWay', VerifyRoleByToken,CookWayRouter.createMultiple);
};
