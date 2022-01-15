const Koa = require('koa')
const Router = require('koa-router')
const router = new Router()
const app = new Koa()

app.use(async (ctx, next) => {
  ctx.body = 'hello world'
})

app.listen(3000)
