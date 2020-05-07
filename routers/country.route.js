
module.exports = (app) => {
    const CountryRouter = require('../controllers/country/country');
    var VerifyToken = require(__root + 'auth/VerifyToken');

    var VerifyRoleByToken = require(__root + 'auth/VerifyRoleByToken');
    app.get('/countrys', CountryRouter.getCountrys);
    app.get('/getCountry', CountryRouter.findCountry);
    app.post('/createCountry', VerifyRoleByToken,CountryRouter.createCountry);
    app.post('/createMultipleCountrys',VerifyRoleByToken,CountryRouter.createMultiple);
    // app.get('/logout', users.logout)

    // app.get('/currentAuthen', users.currentAuthen)
};
