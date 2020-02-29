const mongoose = require('mongoose');
const InterestSchema = mongoose.Schema({
    user: {type: String, default: ''},
    objectId: {type: Object},
    objectType: {type: String, default: ''},
    description:{type:String,default:'Tính lượt quan tâm bài viết, bộ sưu tập, thành viên'}
}, {
    timestamps: true
});
module.exports = mongoose.model('Interests', InterestSchema);
