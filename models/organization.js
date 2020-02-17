const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrganizationSchema = new Schema({
    organizationId: { type: String, default: '' },
    organizationName: { type: String, default: '' },
    specificType: { type: String, default: '' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Organizations', OrganizationSchema);
