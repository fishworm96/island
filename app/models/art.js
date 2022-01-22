const { Movie, Music, Sentence } = require("./classic");

class Art {
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
        break;
        default:
          break;
    }
    return arts
  }
}

module.exports = {
  Art
}