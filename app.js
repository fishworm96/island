const Koa = require('koa')
const Router = require('koa-router')
const requireDirectory = require('require-directory')

const router = new Router()
const app = new Koa()

const modules = requireDirectory(module, './api/v1', { visit: whenLoadModule })

function whenLoadModule (obj) {
  if (obj instanceof Router) {
    app.use(obj.routes())
  }
}


app.listen(3000)
