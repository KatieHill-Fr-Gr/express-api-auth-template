import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'


const userSchema = new mongoose.Schema({
    username: 
    { type: String, 
    required: ['Please choose a username', true], 
    unique: true,
    },
    email: 
    { type: String, 
    required: ['Please enter a valid email address', true], 
    unique: true
    },
    password: 
    { type: String, 
    required: ['Please choose a password', true], 
    unique: true
    }
})

// Hash the password before saving a new user

userSchema.pre('save', function() {
    if (this.isModified('password')) { 
    this.password = bcrypt.hashSync(this.password, 12) // The salt is the last value
    }
    next()
})

// You have to use a declarative function here so we can use the this keyword.
// An arrow functionr refers to a global so can't use with "this"
// You don't want to hash the hashed password on updates to usernname/email etc. 
// So you do a check first so it only hashes when it's a new password

const User = mongoose.model('User', userSchema)

export default User