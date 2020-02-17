const mongoose = require('mongoose');

const { Schema } = mongoose;

const PassengerSchema = new Schema({
    passengerId: { type: String, default: '' },
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    address: { type: String, default: '' },
    birthday: { type: String, default: '' },
    idNo: { type: String, default: '' }
},
    education_dee = {

        educationId: { type: String, default: '' },
        educationName: { type: String, default: '' },
        status: { type: Number, default: 1 },
        address: { type: String, default: '' }

    },
    mediaItem_dee = {

        mediaItemId: String,
        path: String,
        mediaType: Number

    },
    province_dee =
    {
        provinceId: { type: String, default: '' },
        provinceName: { type: String, default: '' }
    },

    {
        timestamps: true
    });

module.exports = mongoose.model('Passengers', PassengerSchema);
