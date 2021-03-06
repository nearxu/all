import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema({
  title: String, //文章标题
  content: String, //文章内容
  viewCount: Number, //浏览次数
  commentCount: Number, //评论次数
  time: String //发表时间
  // coverImg: String, //封面图片
  // author: String, //作者
  // tags: Array, //标签
  // isPublish: Boolean //是否发布
})

module.exports = mongoose.model('Article', articleSchema)
