const mongoose = require('mongoose');

const TrainLogSchema = mongoose.Schema({
    arrivedTime: { type: String, default: '' },
    departTime: { type: String, default: '' },
    status: { type: Number, default: 1 }
},
    station_dee = {
        nameStation: { type: String, default: '' },
        addressStation: { type: String, default: '' },
        personCapacity: { type: Number, default: 500 },
        typeOfStation: { type: Number, default: 1 },
        openTime: { type: String, default: '05h 00' },
        closeTime: { type: String, default: '23h 00' },
        status: { type: Number, default: 1 },
        description: { type: String, default: '' },
        mediaItem_dee: {
            mediaItemId: { type: String, default: '' },
            path: { type: String, default: '' },
            mediaType: { type: Number, default: 1 }
        }
    },

    train_dee = {
        trainId: { type: String, default: '' },
        trainName: { type: String, default: '' },
        personCapacity: { type: String, default: '' },
        startDate: { type: String, default: '' },
        endDate: { type: String, default: '' },
        trainBrand_dee = {
            brandId: { type: String, default: '' },
            brandName: { type: String, default: '' },
            description: { type: String, default: '' },
            version: { type: String, default: '' }
        },
        mediaItem_dee = {
            mediaItemId: { type: String, default: '' },
            path: { type: String, default: '' },
            mediaType: { type: String, default: 1 }
        },

    }, {
    timestamps: true
});

module.exports = mongoose.model('TrainLog', TrainLogSchema);
