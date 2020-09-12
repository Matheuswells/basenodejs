const request = require('supertest')
const server = require('../../src/server')
const factory = require('../factories/user_factory')
const truncate = require('../utils/truncate')

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should create user with valid credentials', async () => {
    const user = await factory.create('User', {
      email: 'user01@email.com'
    })

    expect(user.email).toBe('user01@email.com')
  })

  it('should authenticate with valid credentials', async () => {
    const user = await factory.create('User')

    const response = await request(server)
      .post('/auth/authenticate')
      .send({
        email: user.email,
        password: user.password
      })

    expect(response.status).toBe(200)
  })

  it('should not authenticate with invalid password', async () => {
    const user = await factory.create('User')

    const response = await request(server)
      .post('/auth/authenticate')
      .send({
        email: user.email,
        password: 'wrongPassword'
      })

    expect(response.status).toBe(401)
  })

  it('should not authenticate with invalid email', async () => {
    const user = await factory.create('User')

    const response = await request(server)
      .post('/auth/authenticate')
      .send({
        email: 'invalid@email.com',
        password: user.password
      })
    expect(response.status).toBe(401)
  })

  it('should return JWT token when authenticate with valid credentials', async () => {
    const user = await factory.create('User')

    const response = await request(server)
      .post('/auth/authenticate')
      .send({
        email: user.email,
        password: user.password
      })

    expect(response.body).toHaveProperty('token')
  })

  it('should be able to access private routes with valid JWT token', async () => {
    const user = await factory.create('User')

    const response = await request(server)
      .get('/post')
      .set({
        Authorization: `Bearer ${user.generateToken()}`
      })

    expect(response.status).toBe(200)
  })

  it('should not be able to access private routes without JWT Token', async () => {
    const user = await factory.create('User')

    const response = await request(server).get('/post')
    // .set({
    //   Authorization: `Bearer ${user.generateToken()}`
    // })

    expect(response.status).toBe(401) // Token not provider
  })

  it('should not be able to access private routes without two params in JWT Token', async () => {
    const user = await factory.create('User')

    const response = await request(server)
      .get('/post')
      .set({
        Authorization: user.generateToken()
      })
    expect(response.status).toBe(401) // Token error
  })

  it('should not be able to access private routes without Bearer prefix in JWT Token', async () => {
    const user = await factory.create('User')

    const response = await request(server)
      .get('/post')
      .set({
        Authorization: `not-bearer ${user.generateToken()}`
      })

    expect(response.status).toBe(401) // Token malformated
  })

  it('should not be able to access private routes with invalid JWT Token', async () => {
    const user = await factory.create('User')

    const response = await request(server)
      .get('/post')
      .set({
        Authorization: `Bearer i-am-a-invalid-token`
      })

    expect(response.status).toBe(401) // Token invalid
  })
})
