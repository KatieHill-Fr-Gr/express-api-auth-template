import express from 'express'
import User from '../models/user.js'
import { InvalidData } from '../utilities/errorClasses.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

// * Sign up

router.post('/sign-up', async (req, res, next) => {
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
            { expiresIn: '2d'} // expires in 2 days
        )


        // Response
        return res.status(201).json({ token: token })

    } catch {
        next(error)
    }
}
)



// * Sign in 

router.post('/sign-in', async (req, res, next) => {
    const { identifier, password } = req.body
    try {
    const foundUser = await User.findOne({ 
        $or: [ 
            { username: identifier },
            {email: identifier}
    ]
    })
    if (!foundUser) throw new Unauthorized('USer does not exist')

    if (!bcrypt.compareSync(password, foundUser.password)) throw new Unauthorized ('Passwords do not match')

    // Generate the token: it has to be identical to sign up 

        const token = jwt.sign(
            { 
                user: {
                    _id: newUser._id,
                    username: newUser.username
                }
             },
            process.env.TOKEN_SECRET,
            { expiresIn: '2d'} // expires in 2 days
        )


    } catch (error) {
    next(error)
}
})

export { router as userRouter }
