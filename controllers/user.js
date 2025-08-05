import express from 'express'
import User from '../models/user.js'
import { InvalidData } from '../utilities/errorClasses.js'
import { Unauthorized } from '../utilities/errorClasses.js'
import { NotFound } from '../utilities/errorClasses.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

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
        const token = jwt.sign(
            {
                user: {
                    _id: newUser._id,
                    username: newUser.username
                }
            },
            process.env.TOKEN_SECRET,
            { expiresIn: '2d' } // expires in 2 days
        )


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

        // Generate the token: it has to be identical to sign up 

        const token = jwt.sign(
            {
                user: {
                    _id: foundUser._id,
                    username: foundUser.username
                }
            },
            process.env.TOKEN_SECRET,
            { expiresIn: '2d' } // expires in 2 days
        )

        // Response
        return res.status(201).json({ token: token })


    } catch (error) {
        console.log(error)
        next(error)
    }
})

export { router as userRouter }
