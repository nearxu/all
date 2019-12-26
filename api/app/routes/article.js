import express from 'express'

import Article from '../controller/article'

const router = express.Router()

router.post('/addArticle', Article.addArticle)
router.get('/getList', Article.getList)

export default router
