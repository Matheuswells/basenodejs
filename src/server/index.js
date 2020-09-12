require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})
const express = require('express')
const handlebars = require('express-handlebars')

const server = express()

class ServerController {
  constructor() {
    this.server = server
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.server.set('view-engine', 'hbs')
    this.server.set('views', `${__dirname}/views`)
    this.server.engine(
      'hbs',
      handlebars({
        defaultLayout: 'main',
        layoutsDir: `${__dirname}/views/layouts`,
        extname: 'hbs'
      })
    )

    this.server.use(express.json())
    this.server.use(express.static('public'))
  }

  routes() {
    require('./routes/index')(server)
  }
}

module.exports = new ServerController().server
