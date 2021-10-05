const notesRouter = require('express').Router()
const Note = require('../models/note')


  notesRouter.get('/', (request, response) => {
    Note.find({}).then(notes => {
      response.json(notes)
    })
  })
  
  //BEFORE MONGODB
  // app.get('/api/notes/:id', (request, response) => {
  //     const id = Number(request.params.id)
  //     const note = notes.find(note => note.id === id)
      
  //     if (note) {
  //         response.json(note)
  //       } else {
  //         response.status(404).end()
  //       }
  //     })
  
  notesRouter.get('/:id', (request, response, next) => {
    Note.findById(request.params.id)
      .then(note => {
        if (note) {
          response.json(note)
        } else {
          response.status(404).end()
        }
      })
      .catch(error => next(error))
  })
  
  // app.delete('/api/notes/:id', (request, response) => {
  //   const id = Number(request.params.id)
  //   notes = notes.filter(note => note.id !== id)
  
  //   response.status(204).end()
  // })
  
  notesRouter.delete('/:id', (request, response, next) => {
    Note.findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })
  
  
//   const generateId = () => {
//     const maxId = notes.length > 0
//       ? Math.max(...notes.map(n => n.id))
//       : 0
//     return maxId + 1
//   }
  
  //BEFORE MONGODB
  // app.post('/api/notes', (request, response) => {
  //   const body = request.body
  
  //   if (!body.content) {
  //     return response.status(400).json({ 
  //       error: 'content missing' 
  //     })
  //   }
  
  //   const note = {
  //     content: body.content,
  //     important: body.important || false,
  //     date: new Date(),
  //     id: generateId(),
  //   }
  
  //   notes = notes.concat(note)
  
  //   response.json(note)
  // })
  
  notesRouter.post('/', (request, response) => {
    const body = request.body
  
    if (body.content === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }
  
    const note = new Note({
      content: body.content,
      important: body.important || false,
      date: new Date(),
    })
  
    note.save().then(savedNote => {
      response.json(savedNote)
    })
  })
  
  notesRouter.put('/:id', (request, response, next) => {
    const body = request.body
  
    const note = {
      content: body.content,
      important: body.important,
    }
  
    //By default, the updatedNote parameter of the event handler receives the original document without the modifications. We added the optional { new: true }parameter, which will cause our event handler to be called with the new modified document instead of the original.
    Note.findByIdAndUpdate(request.params.id, note, { new: true })
      .then(updatedNote => {
        response.json(updatedNote)
      })
      .catch(error => next(error))
  })
  

  module.exports = notesRouter