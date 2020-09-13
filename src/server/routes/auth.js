const router = require('express').Router()
const { User } = require('../models')
const AuthController = require('../controllers/AuthController')

router.post('/authenticate', AuthController.login)
router.post('/register', AuthController.register)

router.get('/', (req, res) => {
  res.sendStatus(302)
  // verifica se usuario esta logado
  // se sim redireciona para a home
  // se não redireciona para a pagina de login
})

module.exports = server => server.use('/auth', router)
