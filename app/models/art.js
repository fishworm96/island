const { Op } = require('sequelize')

const { sequelize } = require("../../core/db");

const { Movie, Music, Sentence } = require("./classic");

class Art {
  constructor(art_id, type) {
    this.art_id = art_id
    this.type = type
  }

  async getDetail (uid) {
    const { Favor } = require('./favor')
    const art = await Art.getData(this.art_id, this.type)
    if (!art) {
      throw new global.errs.NotFound()
    }
    const like = await Favor.userLikeIt(this.art_id, this.type, uid)
    return {
      art,
      like_status: like
    }
  }

  static async getData (art_id, type) {
    let art = null
    const finder = {
      where: { id: art_id }
    }

    switch (type) {
      case 100:
        art = await Movie.findOne(finder)
        break;
      case 200:
        art = await Music.findOne(finder)
        break;
      case 300:
        art = await Sentence.findOne(finder)
        break;
      case 400:
        break;
      default:

        break;
    }
    return art
  }

  static async getList (artInfoList) {
    const artInfoObj = {
      100: [],
      200: [],
      300: []
    }
    for (let artInfo of artInfoList) {
      artInfoObj[artInfo.type].push(artInfo.art_id)
    }
    const arts = []
    for (let key in artInfoObj) {
      const ids = artInfoObj[key]
      if (ids.length === 0) {
        continue
      }
      key = parseInt(key)
      await arts.push(await Art._getListByType(ids, key))
    }
    return arts.flat()
  }

  static async _getListByType (ids, type) {
    let arts = []
    const finder = {
      where: {
        id: {
          [Op.in]: ids
        }
      }
    }
    switch (type) {
      case 100:
        arts = await Movie.findOne(finder)
        break;
      case 200:
        arts = await Music.findOne(finder)
        break;
      case 300:
        arts = await Sentence.findOne(finder)
        break;
      case 400:
        const { Book } = require('./book');
        art = await Book.scope(scope).findOne(finder)
        if (!art) {
          art = await Book.create({
            id: art_id,
          })
        }
        break;
      default:
        break;
    }
    // if (art && art.image) {
    //   let imageUrl = art.dataValues.image
    //   art.dataValues.image = global.config.host + imageUrl
    // }
    return arts
  }
}

module.exports = {
  Art
}