import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    rating: {type: Number, default: 0},
    name: {type: String, isRequired: true},
    description:{type:String,default:''},
    restaurant_id: {type: Number, isRequired: true},
    category_id: {type: Number, isRequired: true},
    item_id: {type: Number, isRequired: true},
})

foodSchema.index({item_id: 1});

// const menuSchema = new Schema({
//     name: {type: String, isRequired: true},
// 	id:  {type: Number, isRequired: true},
//     restaurant_id: {type: Number, isRequired: true},
//     foods: [foodSchema]
// })
// menuSchema.index({ id: 1 });

const Food = mongoose.model('Food', foodSchema);
// const Menu = mongoose.model('Menu', menuSchema);

export default Food