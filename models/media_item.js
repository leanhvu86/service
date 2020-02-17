const mongoose = require('mongoose');

const MediaItemSchema = mongoose.Schema({
    mediaItemId: String,
    path: String,
    mediaType: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Media_items', MediaItemSchema);
