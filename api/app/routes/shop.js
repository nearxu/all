import express from 'express'

import Shop from '../controller/shop'
import Food from '../controller/food'

const router = express.Router()

router.post('/addshop',Shop.addShop)
router.post('/getShopList',Shop.getShopList)
router.post('/getShopDetail',Shop.getShopDetail)
router.post('/addfood',Food.addFood)
export default router;