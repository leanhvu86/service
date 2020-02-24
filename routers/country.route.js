
module.exports = (app) => {
    const CountryRouter = require('../controllers/country/country');

    app.get('/countrys', CountryRouter.getCountrys)
    app.get('/getCountry', CountryRouter.findCountry)
    app.post('/createCountry', CountryRouter.createCountry)
    app.post('/createMultipleCountrys', CountryRouter.createMultiple)
    // app.get('/logout', users.logout)

    // app.get('/currentAuthen', users.currentAuthen)
}
