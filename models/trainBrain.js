const mongoose = require('mongoose');

const { Schema } = mongoose;

const TrainBrainSchema = new Schema({
    brandId: { type: String, default: '' },
    brandName: { type: String, default: '' },
    description: { type: String, default: '' },
    version: { type: String, default: '' }
}, {
    timestamps: true
});

module.exports = mongoose.model('TrainBrain', TrainBrainSchema);
