const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/Users')

loginRouter.post('/', async (request, response) => {
  const { email, password } = request.body

  const user = await User.findOne({ email })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.password_hash)
  if (!(user && passwordCorrect)) {

    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userToken = {
    email: user.email,
    id: user._id,
  }

  const token = jwt.sign(userToken, process.env.JWT_SECRET)

  response
    .status(200)
    .send({ token, email: user.email, id: user._id,toles: user.roles })
})

module.exports = loginRouter