const mongoose = require('mongoose');
const FoodTypeSchema = mongoose.Schema({
    foodTypeCode: {type: String, default: ''},
    foodTypeName: {type: String, default: ''},
    status: {type: Number, default: 1}
}, {
    timestamps: true
});

module.exports = mongoose.model('FoodTypes', FoodTypeSchema);
