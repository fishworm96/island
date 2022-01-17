const bcrypt = require('bcryptjs')
const { Sequelize, Model } = require('sequelize')

const { sequelize } = require('../../core/db')

class User extends Model {

}

User.init({
  // 主键： 不能重复 不能为空
  id: {
    type: Sequelize.INTEGER,
    // 主键
    primaryKey: true,
    // 自动增长
    autoIncrement: true,
  },
  nickname: Sequelize.STRING,
  email: {
    type: Sequelize.STRING(128),
    unique: true,
  },
  password: { 
    type: Sequelize.STRING,
    set (val) {
      const salt = bcrypt.genSaltSync(10)
      const psw = bcrypt.hashSync(val, salt)
      this.setDataValue('password',psw)
    }
  },
  openid: {
    type: Sequelize.STRING(64),
    // 必须为唯一
    unique: true,
  },
}, {
  // 我们需要传递连接实例
  sequelize,
  // 我们需要选择模型名称
  tableName: 'user'
})

module.exports = { User }