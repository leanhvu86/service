module.exports = (app) => {
    const CookWayRouter = require('../controllers/cook-way/cook-way');
    var VerifyToken = require(__root + 'auth/VerifyToken');

    app.get('/cookWays', CookWayRouter.getCookWays);
    app.get('/getCookWay', CookWayRouter.findCookWay);
    app.post('/createCookWay', VerifyToken, CookWayRouter.createCookWay);
    app.post('/createMultipleCookWay', VerifyToken, CookWayRouter.createMultiple);
};
