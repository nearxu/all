var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');//用来创建和确认用户信息摘要
var config = require('./config'); //读取配置文件config.js信息

//一些配置
var port = process.env.PORT || 8080; // 设置启动端口
mongoose.connect(config.database); // 连接数据库
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.once("open", () => {
    console.log("连接数据库成功");
});

db.on("error", function (error) {
    console.error("Error in MongoDb connection: " + error);
    mongoose.disconnect();
});

db.on("close", function () {
    console.log("数据库断开，重新连接数据库");
    mongoose.connect(config.url, { server: { auto_reconnect: true } });
});

app.set('superSecret', config.secret); // 设置app 的超级密码--用来生成摘要的密码

//用body parser 来解析post和url信息中的参数
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 使用 morgan 将请求日志打印到控制台
app.use(morgan('dev'));

app.get('/', function (req, res) {
    res.send("这里是nodejs+mongodb编写restfulAPI的笔记！");
})

const setRoute = require('./app/routes/setup')
app.use('/setup', setRoute);

// login
const userRoute = require('./app/routes/user')
app.use('/login', userRoute);

//category
var categoryRoute = require('./app/routes/category');// 导入路由文件
app.use('/category', categoryRoute);   //设置访问路径

//blog
const blogRoute = require('./app/routes/blog')
app.use('/blog', blogRoute);

app.listen(port)

console.log('start listen localhost:' + port);