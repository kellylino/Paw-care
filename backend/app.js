const express = require('express')
const app = express()
const cors = require('cors')
const registerRouter = require('./controllers/register')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')
mongoose.connect(config.MONGO_URI)

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/api/register', registerRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

module.exports = app