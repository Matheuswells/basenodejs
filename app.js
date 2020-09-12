const server = require('./src/server')

server.listen(process.env.PORT || 80, () => {
  console.log(`Server runing at  http://localhost:${process.env.PORT || 80}`)
})
