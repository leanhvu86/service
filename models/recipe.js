const mongoose = require('mongoose');
const RecipeSchema = mongoose.Schema({
    imageUrl: {type: String, default: ''},
    recipeName: {type: String, default: ''},
    content: {type: String, default: ''},
    videoLink: {type: String, default: ''},
    hardLevel: {type: String, default: ''},
    time: {type: String, default: ''},
    ingredients:{type: Array},
    ingredientsGroup:{type:Array},
    cockStep:{type:Array},
    country:{type:Array},
    foodType:{type:Array},
    cookWay:{type:Array},
    description:{type:String,default:'Làm theo phương pháp mặc định'},
    status: {type: Number, default: 1}
}, {
    timestamps: true
});
// imageUrl: string;
// recipeName: string;
// content: string;
// videoLink: string;
// hardLevel: string;
// time: string;
// ingredients: string;
// ingredientsGroup: [];
// cockStep: [];
// image: [];
// country: Country[];
// foodType: FoodType[];
// cookWay: CookWay[];
// status: number;
module.exports = mongoose.model('Recipes', RecipeSchema);
