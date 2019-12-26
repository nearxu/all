import Express from 'express'

import ArticleModel from '../models/article'
import BaseComponent from '../../prototype/baseComponent'
import formidable from 'formidable'
// import { responseClient } from '../utils'

class Article extends BaseComponent {
  constructor() {
    super()
    this.addArticle = this.addArticle.bind(this)
  }
  async addArticle(req, res) {
    // const { title, content } = req.body
    // const time = new Date()
    // const viewCount = 0
    // const commentCount = 0
    // let tempArticle = new ArticleModel({
    //   title,
    //   content,
    //   viewCount,
    //   commentCount,
    //   time
    // })
    // tempArticle
    //   .save()
    //   .then(data => {
    //     console.log(data, 'data')
    //     // responseClient(res, 200, 0, '保存成功', data)
    //   })
    //   .cancel(err => {
    //     console.log(err)
    //     // responseClient(res)
    //   })

    const form = new formidable.IncomingForm()

    form.parse(req, async (err, fields, files) => {
      try {
        const tempArticle = {
          title: fields.title,
          content: fields.content,
          viewCount: viewCount,
          commentCount: commentCount,
          time
        }
        const shop = new ArticleModel(tempArticle)
        await shop.save()
        res.send({
          status: 1,
          success: '添加成功',
          data: tempArticle
        })
      } catch (err) {
        res.send({
          status: 0,
          message: '服务器繁忙'
        })
      }
    })
  }

  async getList(req, res) {
    debugger
    res.send({
      status: 0,
      code: 200,
      data: 'hello get json'
    })
  }
  // async getFoods (req, res, next) {
  //   const { restaurant_id, limit = 10, offset = 0 } = req.query
  //   console.log(restaurant_id, 'id')
  //   try {
  //     const foods = await FoodModel.find(
  //       { restaurant_id: restaurant_id },
  //       '-_id'
  //     )
  //       .sort({ item_id: -1 })
  //       .limit(Number(limit))
  //       .skip(Number(offset))
  //     res.send({
  //       status: 1,
  //       data: foods,
  //       message: '获取食品数据成功'
  //     })
  //   } catch (err) {
  //     res.send({
  //       status: 0,
  //       type: 'GET_DATA_ERROR',
  //       message: '获取食品数据失败'
  //     })
  //   }
  // }
  // async getFoodList (req, res, next) {
  //   const { limit = 20, offset = 0 } = req.query
  //   try {
  //     const foods = await FoodModel.find({}, '-_id')
  //       .sort({ item_id: -1 })
  //       .limit(Number(limit))
  //       .skip(Number(offset))
  //     res.send({
  //       status: 1,
  //       data: foods,
  //       message: '获取食品数据成功'
  //     })
  //   } catch (err) {
  //     res.send({
  //       status: 0,
  //       type: 'GET_DATA_ERROR',
  //       message: '获取食品数据失败'
  //     })
  //   }
  // }
}

export default new Article()
