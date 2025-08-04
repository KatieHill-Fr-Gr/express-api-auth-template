// * 404 not found

// Create a new NotFound class, extending the native JS Error class:

export class NotFound extends Error {
    constructor(message = 'Not Found'){
            super(message) // included in the native Error class
            this.name = 'NotFound' // added for 404 not found errors
            this.status = 404 // added for 404 not found errors
    }
}