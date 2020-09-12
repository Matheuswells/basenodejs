const router = require('express').Router()
const AuthController = require('../controllers/AuthController')

router.get('/register', (req, res) => {
  res.status(200).send('register route')
})

router.post('/authenticate', AuthController.store)

router.get('/', (req, res) => {
  res.sendStatus(302)
  // verifica se usuario esta logado
  // se sim redireciona para a home
  // se não redireciona para a pagina de login
})

module.exports = server => server.use('/auth', router)
