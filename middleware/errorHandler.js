
const errorHandler = (err, req, res, next) => {

    const logError = (err) => {
        console.log('--------------')
        console.log(' ERROR ')
        console.log('Name: ', err.name)
        console.log('Status: ', err.status)
        console.log('Status: ', err.message)
        console.log('--------------')
        console.log('Stack: ')
        console.log(err.stack)
        console.log('--------------')
        console.log('The above error occurred during the below request:')
    }

    // 404 note found
    if (err.status === 404 || err.name === 'NotFound') {
        return res.status(404).json({ message: err.message })

    }

    // Validation Errors

    // Specific to a particular error/field
    // if (err.name === 'InvalidData') {
    //     return res.status(err.status).json({ [err.field]: err.message })
    // }

    // To catch all possible validation errors


    if (err.name === 'ValidationError') {
        const fields = {}

        Object.keys(err.errors).forEach(keyName => {
            fields[keyName] = err.errors[keyName].properties.message
        })

        return res.status(400).json(fields)
    }

    // Every time this happens there's an error object. If it's a validation error, it has a key name for each. When you don't know these, you use the Object.keys to find them (Object.entries for key-value pairs etc.) 

    // fields {}, you assign fieldName to this key basically, and use it to find the relevant error object, then build up the object you want to send back for the error message.

    // Log out the error object to get the info you need (you'll see properties, message, etc.)




    // Malformed ObjectId (req.params)
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Not a valid ObjectId. Please try again.' })
    }

    // If you want to do a unique validator (unique: true is included in the schema and you want to see if there are duplicates).


    // 500 generic server error (goes at the end)
    return res.status(500).json({ message: 'Internal Server Error' })

}

export default errorHandler