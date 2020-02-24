const mongoose = require('mongoose');
const CountrySchema = mongoose.Schema({
    countryCode: {type: String, default: ''},
    countryName: {type: String, default: ''},
    status: {type: Number, default: 1}
}, {
    timestamps: true
});

module.exports = mongoose.model('Countrys', CountrySchema);
