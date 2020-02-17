const mongoose = require('mongoose');
const ProvinceSchema = mongoose.Schema({
    provinceId: { type: String, default: '' },
    provinceName: { type: String, default: '' },
    status: { type: Number, default: 1 }
}, {
    timestamps: true
});

module.exports = mongoose.model('Provinces', ProvinceSchema);
