const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv')
const cors = require('cors')
const usersRoute = require('./routes/usersRoute')

dotenv.config()

app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use(fileUpload())

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('DB Connection Successfull!'))
  .catch((err) => {
    console.log(err)
  })

app.use('/api', usersRoute)

app.listen(process.env.PORT || 5000, () => {
  console.log('Backend server is running!')
})
