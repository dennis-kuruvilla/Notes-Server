const notesRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Note = require('../models/note')
const User = require('../models/user')

  //USING THEN IN THE FOLLOWING FUNCTION, REPLACED BY ASYNC AWAIT
  // notesRouter.get('/', (request, response) => {
  //   Note.find({}).then(notes => {
  //     response.json(notes)
  //   })
  // })

  //modified the following to show the user info of the notes 
  // notesRouter.get('/', async (request, response) => { 
  //   const notes = await Note.find({})
  //   response.json(notes)
  // })

  notesRouter.get('/', async (request, response) => {
    const notes = await Note
      .find({}).populate('user', { username: 1, name: 1 })
  
    response.json(notes)
  });
  
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
  
  //GET A SINGLE NOTE USING THEN()
  // notesRouter.get('/:id', (request, response, next) => {
  //   Note.findById(request.params.id)
  //     .then(note => {
  //       if (note) {
  //         response.json(note)
  //       } else {
  //         response.status(404).end()
  //       }
  //     })
  //     .catch(error => next(error))
  // })

  //USING ASYNC/AWAIT
  notesRouter.get('/:id', async (request, response) => {
    const note = await Note.findById(request.params.id)
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
    // WITH THE HELP OF express-async-errors LIBRARY,  If an exception occurs in a async route, the execution is automatically passed to the error handling middleware.
  })
  
  // app.delete('/api/notes/:id', (request, response) => {
  //   const id = Number(request.params.id)
  //   notes = notes.filter(note => note.id !== id)
  
  //   response.status(204).end()
  // })
  
  // USING THEN()
  // notesRouter.delete('/:id', (request, response, next) => {
  //   Note.findByIdAndRemove(request.params.id)
  //     .then(result => {
  //       response.status(204).end()
  //     })
  //     .catch(error => next(error))
  // })

  notesRouter.delete('/:id', async (request, response) => {
    await Note.findByIdAndRemove(request.params.id)
    response.status(204).end()
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
  
  //POST USING THEN() - 
  // notesRouter.post('/', (request, response, next) => {
  //   const body = request.body
  
  //   const note = new Note({
  //     content: body.content,
  //     important: body.important || false,
  //     date: new Date(),
  //   })
  
  //   note.save().then(savedNote => {
  //     response.json(savedNote)
  //   })
  //   .catch(error => next(error))
  // })

  //identifying the authentication scheme used. here we are using the 'bearer' authentication scheme.
  //and  Identifying the scheme tells the server how the attached credentials should be interpreted.
  //this function  isolates the token from the authorization header
  const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }

  notesRouter.post('/', async (request, response) => {

    const body = request.body
    
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    //getting the document of the user who createed the note
    const user = await User.findById(decodedToken.id)

    // console.log("userid: ",user._id)
    
    // console.log("creating note")

    const note = new Note({
      content: body.content,
      important: body.important || false,
      date: new Date(),
      //adding the id of the user in the note object
      user: user._id
    })

    // console.log("created note")
    
    
    const savedNote = await note.save()
    
    //updating the user's document by concatenating the note id to the array of note id's in the user document
    // console.log("savednotes._id=",savedNote._id)
    user.notes = user.notes.concat(savedNote._id)
    // console.log("user notes=",user.notes)
    // console.log("updated user notes")
    
    await user.save()

    // console.log("saved updated user")

    response.json(savedNote)
  })

  // notesRouter.post('/', async (request, response, next) => {
  //   const body = request.body
  
  //   const user = await User.findById(body.userId)
  
  //   const note = new Note({
  //     content: body.content,
  //     important: body.important === undefined ? false : body.important,
  //     date: new Date(),
  //     user: user._id
  //   })
  
  //   const savedNote = await note.save()
  //   user.notes = user.notes.concat(savedNote._id)
  //   console.log("user notes=",user.notes)
  //   console.log("updated user notes")
  //   await user.save()
  
  //   response.json(savedNote.toJSON())
  // })
  


  
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