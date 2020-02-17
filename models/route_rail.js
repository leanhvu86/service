const mongoose = require('mongoose');

const { Schema } = mongoose;

const RouteRailSchema = new Schema({
    routeId: { type: String, default: '' },
    nameRoute: { type: String, default: '' },
    description: { type: String, default: '' },
    status: { type: Number, default: 1 }
}, {
    timestamps: true
});

module.exports = mongoose.model('RouteRails', RouteRailSchema);
