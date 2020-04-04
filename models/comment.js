const mongoose = require('mongoose');
const CommentSchema = mongoose.Schema({
    user: {type: Object},
    recipe: {type: Object},
    content: {type: String, default: ''},
    imageUrl: {type: String, default: ''},
    videoUrl: {type: String, default: ''},
    type: {type: Number, default: 0},
    description:{type:String,default:'Tính lượt thực hiện công thức'},
    order:Number
}, {
    timestamps: true
});
module.exports = mongoose.model('Comments', CommentSchema);
