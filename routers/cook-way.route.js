
module.exports = (app) => {
    const CookWayRouter = require('../controllers/cook-way/cook-way');

    app.get('/cookWays', CookWayRouter.getCookWays)
    app.get('/getCookWay', CookWayRouter.findCookWay)
    app.post('/createCookWay', CookWayRouter.createCookWay)
    app.post('/createMultipleCookWay', CookWayRouter.createMultiple)
}
