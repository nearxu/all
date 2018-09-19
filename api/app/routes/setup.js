var express = require("express");
var User = require("../models/user");

var router = express.Router();

router.get('/', function (req, res) {
    const admin = new User({
        name: 'zhoupeng1',
        password: '12345',
        admin: true
    })
    admin.save((err) => {
        if (err) {
            res.json({
                success: false,
                message: '管理员创建失败'
            });
        }
        res.json({ success: true, message: "管理员创建成功!!!!!" })
    })
})

module.exports = router;