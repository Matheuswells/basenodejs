/* eslint-disable class-methods-use-this */
const { User } = require('../models')

class AuthController {
  async login(req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ message: 'Wrong password' })
    }
    delete user.dataValues.password_hash
    const token = user.generateToken()
    res.cookie('tapp', token)
    return res.json({ user: user.dataValues, token })
    // return res.json({ user: user.dataValues, token: user.generateToken() })
  }

  async register(req, res) {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(401).send({ message: 'incomplete credentials' })
    }
    let user = await User.create({
      name,
      email,
      password
    })

    user = await User.findOne({ where: { email } })
    // user.password_hash = undefined
    // delete user.password_hash

    delete user.dataValues.password_hash
    return res.json({ user: user.dataValues, token: user.generateToken() })
  }
}

module.exports = new AuthController()
