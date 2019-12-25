import Express from 'express'

import ArticleModel from '../models/article'
import BaseComponent from '../../prototype/baseComponent'
import { responseClient } from '../utils'

// import formidable from 'formidable'

class Article extends BaseComponent {
  constructor() {
    super()
    this.addArticle = this.addArticle.bind(this)
  }
  async addArticle(req, res, next) {
    console.log(req, 'req222222222')
    const { title, content, tags } = req.body
    const time = new Date()
    // const author = req.session.userInfo.username
    // const coverImg = `/${Math.round(Math.random() * 9 + 1)}.jpg`
    const viewCount = 0
    const commentCount = 0
    let tempArticle = new ArticleModel({
      title,
      content,
      // isPublish,
      viewCount,
      commentCount,
      time,
      // author,
      // coverImg,
      tags: tags.split(',')
    })
    tempArticle
      .save()
      .then(data => {
        responseClient(res, 200, 0, '保存成功', data)
      })
      .cancel(err => {
        console.log(err)
        responseClient(res)
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
