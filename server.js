import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'
import 'dotenv/config'
import errorHandler from './middleware/errorHandler.js'

// * Routers

import { tracksRouter } from './controllers/tracks.js'
import { userRouter } from './controllers/user.js'


const app = express()
const port = process.env.PORT || 3000

// * Middleware

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

// * Routes

app.use('/api/tracks', tracksRouter)
app.use('/api/auth', userRouter)

// * Errors
app.use(errorHandler) 
// You're passing a function reference to Express. 
// Express will call it internally with the appropriate arguments (err, req, res, next) only when an error occurs.

// * Get connected

const startServers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connection successful")
        app.listen(port, () => console.log('Server up and running'))
    } catch (error) {
        console.log(error)
    }
}

startServers()