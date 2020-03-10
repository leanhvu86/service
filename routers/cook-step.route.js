
module.exports = (app) => {
    const cookStepRouter = require('../controllers/cook-step/cook-step');

    app.get('/cookStep', cookStepRouter.getCookStep)
    app.get('/oneCookStep', cookStepRouter.findCookStep)
    app.post('/createCookStep', cookStepRouter.createCookStep)
    app.post('/createMultipleCookStep', cookStepRouter.createMultipleCookStep)
    // app.get('/logout', users.logout)

    // app.get('/currentAuthen', users.currentAuthen)
}
