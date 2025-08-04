import mongoose from 'mongoose'

const trackSchema = new mongoose.Schema({
  title:  {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  }
})

const Track = mongoose.model('Track', trackSchema)

export default Track