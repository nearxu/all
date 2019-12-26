import ShopModel from '../models/shop'
import BaseComponent from '../../prototype/baseComponent'
import formidable from 'formidable'
class Shop extends BaseComponent {
  constructor() {
    super()
    this.addShop = this.addShop.bind(this)
  }
  // 添加上铺
  async addShop(req, res, next) {
    debugger
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      try {
        let restaurant_id = await this.getId('restaurant_id')
        console.log(fields, 'fields', restaurant_id)
        const newShop = {
          name: fields.name,
          address: fields.address,
          description: fields.description || '',
          id: restaurant_id,
          phone: fields.phone,
          status: Math.round(Math.random()),
          category: fields.category
        }
        const shop = new ShopModel(newShop)
        await shop.save()
        res.send({
          status: 1,
          success: '添加成功',
          data: newShop
        })
      } catch (err) {
        res.send({
          status: 0,
          message: '服务器繁忙'
        })
      }
    })
  }
  // 获取所有上铺列表
  async getShopList(req, res, next) {
    const { offset = 0, limit = 20 } = req.query
    try {
      const restaurant = await ShopModel.find({}, '-_id')
        .limit(Number(limit))
        .skip(Number(offset))

      res.send({
        data: restaurant,
        status: 1
      })
    } catch (err) {
      console.log(err)
      res.send({
        status: 0,
        message: '服务器繁忙'
      })
    }
  }
  // 获取详情 店铺
  async getShopDetail(req, res, next) {
    const form = new formidable.IncomingForm()
    form.parse(req, async (err, fields, files) => {
      try {
        const { restaurant_id } = fields
        console.log(restaurant_id, 'id')
        const restaurant = await ShopModel.findOne({ id: restaurant_id })
        if (restaurant) {
          res.send({
            status: 1,
            data: restaurant,
            message: '请求成功'
          })
        } else {
          res.send({
            status: 1,
            message: '详情获取失败'
          })
        }
      } catch (err) {
        res.send({
          status: 0,
          message: '服务器繁忙'
        })
      }
    })
  }
}

export default new Shop()
