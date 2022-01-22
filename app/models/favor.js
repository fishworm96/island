const {
  Sequelize,
  Model,
  Op,
} = require('sequelize')

const { sequelize } = require('../../core/db')
const { Art } = require('./art')

class Favor extends Model {
  static async like (art_id, type, uid) {
    const favor = await Favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    })
    if (favor) {
      throw new global.errs.LikeError()
    }
    return sequelize.transaction(async t => {
      await Favor.create({
        art_id,
        type,
        uid
      }, { transaction: t })
      const art = await Art.getData(art_id, type)
      await art.increment('fav_nums', { by: 1, transaction: t })
    })
  }

  static async disLike (art_id, type, uid) {
    const favor = await Favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    })
    if (!favor) {
      throw new global.errs.DisLikeError()
    }
    return sequelize.transaction(async t => {
      await favor.destroy({
        force: false,
        transaction: t
      })
      const art = await Art.getData(art_id, type)
      await art.decrement('fav_nums', { by: 1, transaction: t })
    })
  }

  static async userLikeIt (art_id, type, uid) {
    const favor = await Favor.findOne({
      where: {
        art_id,
        type,
        uid
      }
    })
    return !!favor
  }

  static async getMyClassicFavors (uid) {
    type !== 400
    const arts = Favor.findAll({
      where: {
        uid,
        type: {
          [Op.not]: 400
        }
      }
    })
    if (!arts) {
      throw new global.errs.NotFound()
    }
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