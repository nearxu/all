var express = require("express");
var Blog = require("../models/blog");

var router = express.Router();

router.post('/post', (req, res) => {
    var { title, body, author, tags, hidden, category } = req.body;
    var blog = new Blog({
        title,
        body,
        author,
        tags: tagsObjArray,
        hidden,
        category
    });
    blog.save(err => {
        if (err) {
            res.json({ success: false, messafe: "博客发布失败" })
        };
        res.json({ success: true, message: "博客发布成功" })
    })
})

router.get('/getBlog', (req, res) => {
    // var {category} = req.query;
    Blog.find({}, (err, blogs) => {
        if (err) {
            res.json(err);
        } else {
            res.json({
                success: true,
                data: blogs
            })
        }
    })
})

module.exports = router;