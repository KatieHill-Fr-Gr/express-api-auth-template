
const errorHandler = (err, req, res, next) => {

    // 404 note found
    if (err.status === 404 || err.name === 'NotFound') {
        return res.status(404).json({ message: err.message })

    }

    // Validation Errors
    if (err.name === 'ValidationError') {
        const fields = {}

        Object.keys(err.errors).forEach(fieldName => {
            fields[fieldName] = err.errors[fieldName].properties.message
        })

        return res.status(400).json(fields)
    }

    // Malformed ObjectId (req.params)
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Not a valid ObjectId. Please try again.' })
    }


    // 500 generic Server error (goes at the end)
    return res.status(500).json({ message: 'Internal Server Error' })

}

export default errorHandler