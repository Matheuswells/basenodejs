/* eslint-disable class-methods-use-this */
const { User } = require('../models')

class AuthController {
  async store(req, res) {
    const { email, password } = req.body
    console.log(await req)

    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ message: 'Wrong password' })
    }
    delete user.dataValues.password_hash
    return res.json({ user: user.dataValues, token: user.generateToken() })
  }
}

module.exports = new AuthController()
