const config = require('./utils/config')

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const routeRouter = require('./controllers/quotes')
const clientsRouter = require('./controllers/clients')
const loginRouter = require('./controllers/login')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(err => {
    console.log('fail to connect MongoDB', err.message)
  })

app.use('/api/quotes', routeRouter)
app.use('/api/clients', clientsRouter)
app.use('/login', loginRouter)

module.exports = app