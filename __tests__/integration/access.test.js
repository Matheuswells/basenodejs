const request = require('supertest')
const server = require('../../src/server')

describe('Access', () => {
  // Front
  it('should redirect user to /home when try to access / router', async () => {
    const response = await request(server).get('/')
    expect(response.status).toBe(302)
  })
  it('should be able to access home router', async () => {
    const response = await request(server).get('/home')
    expect(response.status).toBe(200)
  })

  // Back
  it('should redirect user to /auth/authenticate route when access /auth router', async () => {
    const response = await request(server).get('/auth')
    expect(response.status).toBe(302)
  })
  it('should be able to access register router', async () => {
    const response = await request(server).get('/auth/register')
    expect(response.status).toBe(200)
  })
})
