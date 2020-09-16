const request = require('supertest')
const server = require('../../src/server')
const factory = require('../factories/post_factory')
const truncate = require('../utils/truncate')

it('should create post with valid contents', async () => {
  const post = await factory.create('Post', {
    title: 'my title'
  })

  expect(post.title).toBe('my title')
})
