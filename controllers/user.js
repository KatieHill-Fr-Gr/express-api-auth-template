import express from 'express'
import User from '../models/user.js'
import { InvalidData } from '../utilities/errorClasses.js'

const router = express.Router()

// * Sign up

router.post('/sign-up', async (req, res, next) => {
    try {
        if (req.body.password !== req.body.passwordConfirmation) {
            throw new InvalidData('Passwords do not match', 'password') // custom error handling
        }
        const newUser = await User.create(req.body)
        return res.json({ message: 'HIT SIGN UP ROUTE'})
    } catch {
        next(error)
    }
}
)



// * Sign in 

export { router as userRouter }
