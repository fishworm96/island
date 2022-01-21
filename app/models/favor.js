const {
  Sequelize,
  Model,
} = require('sequelize')

const { sequelize } = require('../../core/db')
const { Art } = require('./art')


class Favor extends Model {
  static async like (art_id, type, uid) {
    const favor = await favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    })
    if (favor) {
      throw new global.errs.LikeError()
    }
    sequelize.transaction( async t => {
      await Favor.create({
        art_id,
        type,
        uid
      }, {transaction: t})
      const art = Art.getData(art_id, type)
      await art.increment('fav_nums', {by: 1, transaction: t})
    })
  }

  static async disLike (art_id, type, uid) {

  }
}

Favor.init({
  uid: Sequelize.INTEGER,
  art_id: Sequelize.INTEGER,
  type: Sequelize.INTEGER
}, {
  sequelize,
  tableName: 'favor'
})

module.exports = {
  Favor
}