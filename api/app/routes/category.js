var express = require('express');
var Category = require('../models/category')
var router = express.Router();

router.post('/addTitle', (req, res) => {
    const title = req.body.title;
    const category = new Category({
        title: title
    })
    category.save(err => {
        if (err) {
            res.json({
                success: false,
                message: "添加分类成功！"
            })
        }
    })
    res.json({ success: true, message: "添加分类成功！" })
})

// 查看所有分类
router.get('/allTitle', function (req, res) {
    Category.find({}, function (err, categories) {
        res.json({
            success: true,
            data: categories
        })
    })
})

module.exports = router;