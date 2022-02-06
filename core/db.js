const {Sequelize, Model} = require('sequelize')
const {unset, clone, isArray} = require('lodash')
const {
  dbName,
  host,
  port,
  user,
  password
} = require('../config/config').database

const sequelize = new Sequelize(dbName, user, password, {
  // 数据库类型
  dialect: 'mysql',
  host,
  port,
  // 日志
  logging: true,
  // 北京时区
  timezone: '+8:00',
  define: {
    // 是否为表添加 deletedAt 字段
    // 默认情况下, destroy() 方法会删除数据，
    // 设置 paranoid 为 true 时，将会更新 deletedAt 字段，并不会真实删除数据。
    timestamps: false,
    paranoid: true,
    // 是否为表添加 createdAt 和 updatedAt 字段
    // createdAt 记录表的创建时间
    // updatedAt 记录字段更新时间
    createdAt: 'create_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    // 添加下划线
    underscored: true,
  }
})

sequelize.sync({
  // 强制同步
  // 删除同名数据表后同步，谨慎使用，会导致数据丢失
  force: false
})

Model.prototype.toJSON = function () {
  let data = clone(this.dataValues)
  unset(data, 'updated_at')
  unset(data, 'created_at')
  unset(data, 'deleted_at')
  if (isArray(this.exlude)) {
    this.exclude.forEach((value) => {
      unset(data, value)
    })
  }
  return data
}

module.exports = {
  sequelize
}