const { Sequelize, Model, Op } = require('sequelize')
const { default: axios } = require('axios')
const util = require('util')

const { sequelize } = require('../../core/db')
const { result } = require('lodash')

class Book extends Model {
  constructor (id) {
    super()
    this.id = id
  }

  async detail () {
    const url = util.format(global.config.yushu.detailUrl, this.id)
    const detail = await axios.get(url)
    return detail.data
  }

  static async seachFromYuShu (q, start, count, summary = 1) {
    const url = util.format(global.config.yushu.keywordUrl, encodeUrI(q), start, count, summary)
    const resutt = await axios.get(url)
    return result.data
  }

  static async getBookFavor (uid, bookId) {
    const favorNums = await Favor.count({
      where: {
        art_id: bookId,
        type: 400
      }
    })
    const myFavor = await Favor.findOne({
      where: {
        art_id: bookId,
        uid,
        type: 400
      }
    })
    return {
      fav_nums: favorNums,
      liek_status: myFavor ? 1 : 0
    }
  }
}

Book.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  fav_nums: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
}, {
  sequelize,
  tableName: 'book'
})

module.exports = { Book }