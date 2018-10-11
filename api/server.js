var express = require('express');
import db from './mongodb/db.js'
import session from 'express-session';
import connectMongo from 'connect-mongo';

const MongoStore = connectMongo(session);

var app = express();
import router from './app/routes/index.js';

var config = require('./config'); //读取配置文件config.js信息

//一些配置
var port = process.env.PORT || 8080; // 设置启动端口

app.all('*', (req, res, next) => {
	res.header("Access-Control-Allow-Origin", req.headers.Origin || req.headers.origin || 'https://cangdu.org');
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  	res.header("Access-Control-Allow-Credentials", true); //可以带cookies
	res.header("X-Powered-By", '3.2.1')
	if (req.method == 'OPTIONS') {
	  	res.send(200);
	} else {
	    next();
	}
});
router(app)

app.listen(port)

console.log('start listen localhost:' + port);