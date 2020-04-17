
module.exports = (app) => {
    const cookStepRouter = require('../controllers/cook-step/cook-step');
    var VerifyToken = require(__root + 'auth/VerifyToken');

    app.get('/cookStep', cookStepRouter.getCookStep);
    app.get('/oneCookStep', cookStepRouter.findCookStep);
    app.post('/createCookStep',VerifyToken, cookStepRouter.createCookStep);
    app.post('/createMultipleCookStep',VerifyToken, cookStepRouter.createMultipleCookStep);
    // app.get('/logout', users.logout)

    // app.get('/currentAuthen', users.currentAuthen)
};
