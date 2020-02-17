
module.exports = (app) => {
    const provinceRouter = require('../controllers/province/provinces');

    app.get('/provinces', provinceRouter.getProvinces)
    app.get('/oneProvince', provinceRouter.findProvince)
    app.post('/createProvince', provinceRouter.create)
    app.post('/createMultipleProvinces', provinceRouter.createMultiple)
    // app.get('/logout', users.logout)

    // app.get('/currentAuthen', users.currentAuthen)
}
