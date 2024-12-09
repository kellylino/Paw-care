const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const registerRouter = require('./controllers/register')
const loginRouter = require('./controllers/login')
const userRouter = require('./controllers/user')
const giverRouter = require('./controllers/giver')
const ownerRouter = require('./controllers/owner')
const petRouter = require('./controllers/pet')
const bookingRouter = require('./controllers/booking')
const mongoose = require('mongoose')
mongoose.connect(config.MONGO_URI)

app.use(cors())
app.use(express.json())
app.use('/api/register', registerRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/api/givers', giverRouter)
app.use('/api/owners', ownerRouter)
app.use('/api/pets', petRouter)
app.use('/api/bookings', bookingRouter)
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

module.exports = app
