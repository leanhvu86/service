const mongoose = require('mongoose');
const CookStepSchema = mongoose.Schema({
    name: {type: String, default: ''},
    time: {type: String, default: ''},
    psnote: {type: String, default: ''},
    image: {type: String, default: ''},
    check: {type: String, default: ''},
    description:{type:String,default:'Làm theo phương pháp mặc định'},
    status: {type: Number, default: 1}
}, {
    timestamps: true
});

module.exports = mongoose.model('CookSteps', CookStepSchema);
