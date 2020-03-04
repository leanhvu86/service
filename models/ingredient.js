const mongoose = require('mongoose');
const IngredientSchema = mongoose.Schema({
    quantitative: {type: String, default: ''},
    typeOfquantitative: {type: String, default: ''},
    ingredientName: {type: String, default: ''},
    ingredientCode: {type: String, default: ''},
    note: {type: String, default: ''},
    status: {type:String, default: ''},
    description:{type:String,default:'Tính lượt quan tâm bài viết, bộ sưu tập, thành viên'}
}, {
    timestamps: true
});
module.exports = mongoose.model('Ingredients', IngredientSchema);
