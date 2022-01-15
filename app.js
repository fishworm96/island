const Koa = require('koa')
const parser = require('koa-bodyparser')

const InitManager = require('./core/init')

const app = new Koa()

app.use(parser())
// 解析api
InitManager.initCore(app)


app.listen(3000)
