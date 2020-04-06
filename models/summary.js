const mongoose = require('mongoose');
const SummarySchema = mongoose.Schema({
    userCount: {type: Number,default: 0},
    recipeCount: {type: Number,default: 0},
    galleryCount: {type: Number,default: 0},
    imageCount: {type: Number,default: 0},
    connectCount: {type: Number,default: 0},
    loginCount: {type: Number, default: 0},
    description:{type:String,default:'Hiển thị trang hoạt động trang web'}
}, {
    timestamps: true
});
module.exports = mongoose.model('Summarys', SummarySchema);
