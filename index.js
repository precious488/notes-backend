require('dotenv').config()
const express = require('express')
const Note = require('./models/notes.js')

const app = express()

const cors = require('cors')
const mongoose = require('mongoose')


app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

app.get('/api/notes', (req, res)=>{
  Note.find({}).then(notes =>{
    res.json(notes)
  })
})

app.post('/api/notes', (req, res)=>{
  const body = req.body
  if(!body.content){
    return res.status(404).json({"error":"content misssing"})
  }
  const note = new Note({
    content:body.content,
    important:body.important || false,
  })
  note.save().then(savedNote=> {
    res.json(savedNote)
  })
})

app.get('./api/notes/:id', (req, res)=>{
  Note.findByDd(req.params.id).then(note=>{
    res.json(note)
  })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, ()=>{
console.log(`Server running on port ${PORT}`)


})
