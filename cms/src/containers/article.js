import React, { Component } from 'react'

import { Input, Button } from 'antd'
import http from '../server/http'
import style from './style.css'

// const Option = Select.Option

class Article extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      content: '',
      tags: '',
      tagsBase: [1, 2, 3, 4],
      data: null
    }
  }
  titleOnChange(e) {
    const val = e.target.value
    this.setState({ title: val })
  }
  onChanges(e) {
    const val = e.target.value
    this.setState({ content: val })
  }
  selectTags(e) {
    const val = e.target.value
    this.setState({ tags: val })
  }

  publishArticle() {
    const { title, content } = this.state
    const time = new Date()
    const viewCount = 0
    const commentCount = 0
    const params = {
      title,
      content,
      time,
      viewCount,
      commentCount
    }
    http
      .post('/api/article/addArticle', params)
      .then(res => {
        this.setState({ data: res.data.data })
      })
      .catch(err => {
        console.log(err.message)
      })
  }
  saveArticle() {
    http
      .get('/api/article/getList')
      .then(res => {
        console.log(res, 'res')
      })
      .catch(err => {
        console.log(err.message)
      })
  }
  preView() {}

  render() {
    const { title, content } = this.state
    return (
      <div>
        <h2>发文</h2>
        <div className={style.container}>
          <span className={style.subTitle}>标题</span>
          <Input
            className={style.titleInput}
            placeholder={'请输入文章标题'}
            type="text"
            value={title}
            onChange={this.titleOnChange.bind(this)}
          />
          <span className={style.subTitle}>正文</span>
          <textarea
            className={style.textArea}
            value={content}
            onChange={this.onChanges.bind(this)}
          />
          {/* <span className={style.subTitle}>分类</span> */}
          {/* <Select
            mode="multiple"
            className={style.titleInput}
            placeholder="请选择分类"
            onChange={this.selectTags.bind(this)}
            value={tags}
          >
            {tagsBase.map(item => (
              <Option key={item}>{item}</Option>
            ))}
          </Select> */}

          <div className={style.bottomContainer}>
            <Button
              type="primary"
              onClick={this.publishArticle.bind(this)}
              className={style.buttonStyle}
            >
              发布
            </Button>
            <Button
              type="primary"
              onClick={this.saveArticle.bind(this)}
              className={style.buttonStyle}
            >
              保存
            </Button>
            <Button
              type="primary"
              onClick={this.preView.bind(this)}
              className={style.buttonStyle}
            >
              预览
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Article
