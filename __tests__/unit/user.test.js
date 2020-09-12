const bcrypt = require('bcryptjs')
const truncate = require('../utils/truncate')
const factory = require('../factories/user_factory')

describe('User', () => {
  beforeEach(async () => {
    await truncate()
  })

  it('should encrypt user password', async () => {
    const user = await factory.create('User')
    expect(await bcrypt.compare(user.password, user.password_hash)).toBe(true)
  })

  it('should encrypt user password again and compare', async () => {
    const user = await factory.create('User')
    const hash = await bcrypt.hash(user.password, 8)
    expect(await bcrypt.compare(user.password, hash)).toBe(true)
  })
})
