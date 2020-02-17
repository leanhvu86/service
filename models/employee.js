const mongoose = require('mongoose');

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
    employeeId: { type: String, default: '' },
    employeeName: { type: String, default: '' },
    email: { type: String, default: '' },
    birthday: { type: String, default: '' },
    status: { type: Number, default: 1 }
},
    organization_dee = {
        organizationId: { type: String, default: '' },
        organizationName: { type: String, default: '' },
        specificType: { type: String, default: '' }
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

module.exports = mongoose.model('Employees', EmployeeSchema);
