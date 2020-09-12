const router = require('express').Router()
const { User } = require('../models')
const authMiddleware = require('../middlewares/authorize')
const AuthController = require('../controllers/AuthController')

router.use(authMiddleware)

router.get('/', (req, res) => {
  res.sendStatus(200)
})

router.post('/authenticate', AuthController.store)

module.exports = server => server.use('/post', router)
