import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
    return jwt.sign(
        {
            user: {
                _id:user.id,
                username: user.username
            }
        }, // First argument is the payload
        process.env.TOKEN_SECRET, // Second argument is the Secret
        { expiresIn: '2d' } // Third is the "options" object
    )
}