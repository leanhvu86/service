

module.exports = (app) => {
    const routeRailsRouter = require('../controllers/route-rail/route-rail');

    app.get('/routeRails', routeRailsRouter.getRouteRails)

    app.post('/createRouteRails', routeRailsRouter.create)
    app.post('/createMultipleRouteRails', routeRailsRouter.createMultiple)
}

