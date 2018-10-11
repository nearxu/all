import {Food as FoodModel,Menu as MenuModel} from '../models/food'
import ShopModel from '../models/shop'
import BaseComponent from '../../prototype/baseComponent'
import formidable from 'formidable'

class Food extends BaseComponent{
    constructor(){
        super()
        this.addFood = this.addFood.bind(this)
    }
    async addFood(req,res,next){
        const form = new formidable.IncomingForm();
        let item_id = await this.getId('item_id')
        form.parse(req , async (err,fields,files) => {
            try{
                category = await MenuModel.findOne({id: fields.category_id});
                restaurant = await ShopModel.findOne({id: fields.restaurant_id});
                console.log(category,'category',restaurant,'restaurant')
                const newFood = {
                    name:fields.name,
                    description: fields.description,
                    restaurant_id: fields.restaurant_id,
                    rating:fields.rating,
                    category_id:fields.category_id,
                    item_id
                }
                const foodEntity = await FoodModel.create(newFood)
                category.foods.push(foodEntity);
                await category.save()
            }catch(err){
                res.send({
					status: 0,
					type: 'ERROR_DATA',
					message: '添加食品失败'
				})
            }
        })
    }
}

export default new Food()