const mongoose = require('mongoose');
const GallerySchema = mongoose.Schema({
    user: {type: String, default: ''},
    name: {type: String, default: ''},
    content: {type: String, default: ''},
    imageUrl: {type: String, default: ''},
    totalPoint: {type: Number, default: 0},
    recipe:{type:Array},
    description:{type:String,default:'Bộ sưu tập công thức'}
}, {
    timestamps: true
});
module.exports = mongoose.model('Gallerys', GallerySchema);
