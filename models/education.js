const mongoose = require('mongoose');

const { Schema } = mongoose;

const EducationSchema = new Schema({
    educationId: { type: String, default: '' },
    educationName: { type: String, default: '' },
    status: { type: Number, default: 1 },
    address: { type: String, default: '' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Educations', EducationSchema);
