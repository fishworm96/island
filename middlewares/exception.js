const {HttpException} = require('../core/http-exception')

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    // 开发环境返回错误
    const isHttpException = error instanceof HttpException
    const isDev = global.config.environment === 'dev'
    if(isDev && !isHttpException) {
      throw error
    }
    // 生产环境返回错误
    if (isHttpException) {
      ctx.body = {
        msg: error.msg,
        error_code: error.errorCode,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = error.code
    } else {
      ctx.boyd = {
        msg: '一个错误',
        error_code: 999,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = 500
    }

  }
}

module.exports = catchError