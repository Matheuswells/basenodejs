const User = require('./User')

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    owner: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'id'
      }
    }
  })

  return Post
}
