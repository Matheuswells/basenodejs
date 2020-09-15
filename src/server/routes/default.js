const router = require('express').Router()
const authMiddleware = require('../middlewares/authorize')

router.get('/', (req, res) => {
  res.redirect('/home')
})

router.get('/home', (req, res) => {
  res.sendStatus(200)
})

router.get('/login', (req, res) => {
  res.render('pages/auth/signInForm.hbs')
})

router.get('/register', (req, res) => {
  res.render('pages/auth/signUpForm.hbs')
})
router.use(authMiddleware)
router.get('/posts', (req, res) => {
  res.render('pages/posts/posts.hbs')
})
module.exports = server => server.use('/', router)
