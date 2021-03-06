const Router = require('koa-router')

const { User } = require('../../models/user')
const { RegisterValidator } = require('../../validators/validator')
const { success } = require('../../lib/helper')
const router = new Router({ prefix: '/v1/user' })

router.post('/register', async (ctx) => {
  const v = await new RegisterValidator().validate(ctx)
  const user = {
    email: v.get('body.email'),
    password: v.get('body.password2'),
    nickname: v.get('body.nickname'),
  }

  const r = User.create(user)
  success()
})

module.exports = router