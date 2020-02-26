const mongoose = require('mongoose');
const CookWaySchema = mongoose.Schema({
    cookWayCode: {type: String, default: ''},
    cookWayName: {type: String, default: ''},
    description:{type:String,default:'Làm theo phương pháp mặc định'},
    status: {type: Number, default: 1}
}, {
    timestamps: true
});

module.exports = mongoose.model('CookWays', CookWaySchema);
