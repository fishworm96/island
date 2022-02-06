const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')

const classicFields = {
  image: {
    type: Sequelize.STRING
  },
  content: Sequelize.STRING,
  pubdate: Sequelize.DATEONLY,
  fav_nums: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  title: Sequelize.STRING,
  type: Sequelize.TINYINT,
}

class Movie extends Model {
  
}

class Music extends Model {

}

class Sentence extends Model {

}

Movie.init(classicFields, {
  sequelize,
  tableName: 'movie'
})

Sentence.init(classicFields, {
  sequelize,
  tableName: 'sentence'
}
)

const musicFields = Object.assign({
  url: Sequelize.STRING
}, classicFields)

Music.init(musicFields, {
  sequelize,
  tableName: 'music'
})

module.exports = {
  Movie,
  Sentence,
  Music,
}