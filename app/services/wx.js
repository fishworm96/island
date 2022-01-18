const { default: axios } = require('axios')
const util = require('util')

class WXManager {

  static async codeToken (code) {
    const url = util.format(global.config.wx.loginUrl
      , global.config.wx.appId
      , global.config.wx.appSecret)

      const result = await axios.get(url)
      if (result.status !== 200) {
        throw new global.errs.AuthFailed('openId获取失败')
      }
      const errcode = result.data.errcode
      if (errcode !== 0) {
        throw new global.errs.AuthFailed('openId获取失败:' + errcode)
      }
  }
}