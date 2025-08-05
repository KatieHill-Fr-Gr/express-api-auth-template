import express from 'express'
import User from '../models/user.js'
import { InvalidData } from '../utilities/errorClasses.js'
import { Unauthorized } from '../utilities/errorClasses.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { generateToken } from '../utilities/tokens.js'

const router = express.Router()

// * Sign up

router.post('/sign-up', async (req, res, next) => {
    console.log('Sign-up route hit')
    try {
        if (req.body.password !== req.body.passwordConfirmation) {
            throw new InvalidData('Passwords do not match', 'password') // custom error handling
        }
        const newUser = await User.create(req.body)

        // Token
        const token = generateToken(newUser)

        // Response
        return res.status(201).json({ token: token })

    } catch (error) {
        console.error('Error in sign-up route:', error);
        next(error)
    }
})



// * Sign in 

router.post('/sign-in', async (req, res, next) => {
    console.log('Sign-in route hit')

    const { identifier, password } = req.body // This is the payload structure

    try {
        const foundUser = await User.findOne({
            $or: [
                { username: identifier },
                { email: identifier }
            ]
        })

        console.log('Found user:', foundUser)


        if (!foundUser) throw new Unauthorized('User does not exist')

        if (!bcrypt.compareSync(password, foundUser.password)) throw new Unauthorized('Password not recognized')

        // Generate the token: it has to be identical to sign up but with founder user this time 

        // Token
        const token = generateToken(foundUser)

        // Response
        return res.status(201).json({ token: token }) // sends the token back to the client 


    } catch (error) {
        console.log(error)
        next(error)
    }
})

export { router as userRouter }
