const faker = require('faker')
const { factory } = require('factory-girl')
const { Post } = require('../../src/server/models')

factory.define('Post', Post, {
  title: faker.lorem.words(5),
  content: faker.lorem.paragraphs(1),
  owner: faker.random.number({ min: 10, max: 100 })
})

module.exports = factory
