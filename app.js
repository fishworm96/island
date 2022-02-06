const Koa = require('koa')
const parser = require('koa-bodyparser')
const static = require('koa-static')
const path = require('path')

const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')

const app = new Koa()
app.use(catchError)
app.use(parser())
app.use(static(path.join(__dirname, './static')))

// 解析api
InitManager.initCore(app)


app.listen(3000)
