import express from 'express'

import Shop from '../controller/shop'
import Food from '../controller/food'

const router = express.Router()

router.post('/addshop', Shop.addShop)
router.get('/getShopList', Shop.getShopList)
router.post('/getShopDetail', Shop.getShopDetail)
router.post('/addfood', Food.addFood)
router.get('/getFoods', Food.getFoods)
router.get('/getFoodList', Food.getFoodList)
export default router
