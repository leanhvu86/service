const mongoose = require('mongoose');

const { Schema } = mongoose;

const TrainScheduleSchema = new Schema({
    id: { type: String, default: '' },
    fromDate: { type: String, default: '' },
    toDate: { type: String, default: '' },
    dateCountDelay: { type: Number, default: 0 },
    description: { type: String, default: '' }
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
        }
    },

    {
        timestamps: true
    });

module.exports = mongoose.model('TrainSchedule', TrainScheduleSchema);