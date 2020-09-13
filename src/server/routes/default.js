const router = require('express').Router()

router.get('/', (req, res) => {
  res.redirect('/home')
})

router.get('/home', (req, res) => {
  res.sendStatus(200)
})

router.get('/posts', (req, res) => {
  res.render('pages/posts/posts.hbs')
})
router.get('/login', (req, res) => {
  res.render('pages/auth/signInForm.hbs')
})

router.get('/register', (req, res) => {
  res.render('pages/auth/signUpForm.hbs')
})

module.exports = server => server.use('/', router)
