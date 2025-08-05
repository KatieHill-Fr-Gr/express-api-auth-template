import express from 'express'
import Track from '../models/track.js'
import { NotFound } from '../utilities/errorClasses.js'

const router = express.Router()

// * Create
// Path: /api/tracks
router.post('', async (req, res, next) => {
  try {
    const track = await Track.create(req.body)
    return res.status(201).json(track)
  } catch (error) {
    next(error)
  }
})

// * Index
// Path: /api/tracks
router.get('', async (req, res, next) => {
  try {
    const tracks = await Track.find()
    return res.json(tracks)
  } catch (error) {
    next(error)
  }
})

// * Show
// Path: /api/tracks/:trackId
router.get('/:trackId', async (req, res, next) => {
  try {
    const { trackId } = req.params
    const track = await Track.findById(trackId)
    if (!track) throw new NotFound('Track not found')
    return res.json(track)
  } catch (error) {
    next(error)
  }
})

// * Update
// Path: /api/tracks/:trackId
router.put('/:trackId', async (req, res, next) => {
  try {
    const { trackId } = req.params
    const track = await Track.findById(trackId)
    if (!track) throw new NotFound('Track not found')

    const updatedTrack = await Track.findByIdAndUpdate(trackId, req.body, {
      returnDocument: 'after'
    })
    return res.json(updatedTrack)
  } catch (error) {
    next(error)
  }
})


// * Delete
// Path: /api/tracks/:trackId
router.delete('/:trackId', async (req, res) => {
  try {
    const { trackId } = req.params
    const track = await Track.findById(trackId)
    if (!track) throw new NotFound('Track not found')
    
    await Track.findByIdAndDelete(trackId)
    return res.sendStatus(204) 
  } catch (error) {
    next(error)
  }
})



export { router as tracksRouter }