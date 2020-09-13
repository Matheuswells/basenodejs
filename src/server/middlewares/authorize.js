const jwt = require('jsonwebtoken')
const { promisify } = require('util')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader)
    return (
      res
        .status(401)
        // .redirect('/login')
        .json({ message: 'Token not provided' })
    )

  const parts = authHeader.split(' ')

  // if (!parts.lenght === 2)
  //   return res.status(401).json({ message: 'Token error' })

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).json({ message: 'Token malformatted' })

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET)
    req.userId = decoded.id
    return next()
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid' })
  }
}
