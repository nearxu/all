import FoodModel from '../models/food'
import ShopModel from '../models/shop'
import BaseComponent from '../../prototype/baseComponent'
import formidable from 'formidable'

class Food extends BaseComponent {
  constructor () {
    super()
    this.addFood = this.addFood.bind(this)
  }
  async addFood (req, res, next) {
    const form = new formidable.IncomingForm()
    let item_id = await this.getId('item_id')
    console.log(item_id, 'id')
    form.parse(req, async (err, fields, files) => {
      try {
        // category = await MenuModel.findOne({id: fields.category_id});
        // console.log(category,'category')
        const restaurant = await ShopModel.findOne({ id: fields.restaurant_id })
        if (restaurant) {
          const newFood = {
            name: fields.name,
            description: fields.description,
            restaurant_id: +fields.restaurant_id,
            rating: +fields.rating,
            category_id: +fields.category_id,
            item_id: item_id
          }
          console.log(newFood, 'newFood')
          const foods = new FoodModel(newFood)
          await foods.save()
          res.send({
            status: 1,
            message: '商品添加成功'
          })
        } else {
          res.send({
            status: 1,
            message: '没有发现该店铺'
          })
        }
      } catch (err) {
        res.send({
          status: 0,
          type: 'ERROR_DATA',
          message: '添加食品失败'
        })
      }
    })
  }
  async getFoods (req, res, next) {
    const { restaurant_id, limit = 10, offset = 0 } = req.query
    console.log(restaurant_id, 'id')
    try {
      const foods = await FoodModel.find(
        { restaurant_id: restaurant_id },
        '-_id'
      )
        .sort({ item_id: -1 })
        .limit(Number(limit))
        .skip(Number(offset))
      res.send({
        status: 1,
        data: foods,
        message: '获取食品数据成功'
      })
    } catch (err) {
      res.send({
        status: 0,
        type: 'GET_DATA_ERROR',
        message: '获取食品数据失败'
      })
    }
  }
  async getFoodList (req, res, next) {
    const { limit = 20, offset = 0 } = req.query
    try {
      const foods = await FoodModel.find({}, '-_id')
        .sort({ item_id: -1 })
        .limit(Number(limit))
        .skip(Number(offset))
      res.send({
        status: 1,
        data: foods,
        message: '获取食品数据成功'
      })
    } catch (err) {
      res.send({
        status: 0,
        type: 'GET_DATA_ERROR',
        message: '获取食品数据失败'
      })
    }
  }
}

export default new Food()
