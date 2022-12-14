const express = require('express')
const colors = require('colors')
const cors = require('cors')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
require('dotenv').config()

// SETUP PORT
const port = process.env.PORT || 5000

// CONNECT TO MONGODB
connectDB()

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ESTABLISHES ROUTE API
app.use('/api/projects', require('./routes/projectRoutes'))
app.use('/api/subtasks', require('./routes/subTaskRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))