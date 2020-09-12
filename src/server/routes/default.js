const router = require('express').Router()

router.get('/', (req, res) => {
  res.redirect('/home')
})

router.get('/home', (req, res) => {
  res.render('pages/auth/signInForm.hbs')
})

module.exports = server => server.use('/', router)
