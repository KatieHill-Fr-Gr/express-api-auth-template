
import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import { Unauthorized } from '../utilities/errorClasses.js'

const verifyToken = async (req, res, next) => {
    console.log('User authentication check')
    try {
        const authHeader = req.headers.authorization

        if (!authHeader) throw new Unauthorized('No authorization header provided') // to check the auth header has been provided

        const token = authHeader.split(' ')[1] // Gets the second part which is the token (without the 'Bearer ')

        const payload = jwt.verify(token, process.env.TOKEN_SECRET) // Verifying the token itself

        const foundUser = await User.findById(payload.user._id)
        console.log(payload.user._id)

        if (!foundUser) throw new Unauthorized('User does not exist') // Check the user payload exists in database

        req.user = foundUser // modifying the req object by adding a key called "user" which is equal to the logged in user

        next() // So it moves the request on to the controller or next piece of middleware
 
    } catch (error) {
        console.error("Auth Error:", error)
        next(error)
    }
}

export default verifyToken