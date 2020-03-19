const mongoose = require('mongoose');
const MessageSchema = mongoose.Schema({
    user: {type: String, default: ''},
    content: {type: String, default: ''},
    imageUrl: {type: String, default: ''},
    videoUrl: {type: String, default: ''},
    news: {type: Number, default: 0},
    description:{type:String,default:'Tính lượt thực hiện công thức'}
}, {
    timestamps: true
});
module.exports = mongoose.model('Messages', MessageSchema);
