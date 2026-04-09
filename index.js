const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

let notes =[
    {
      "id": 1,
      "content": "HTML is easy",
      "date": "2022-01-17T17:30:31.098Z",
      "important": false
    },
    {
      "id": 2,
      "content": "Browser can execute only JavaScript",
      "date": "2022-01-17T18:39:34.091Z",
      "important": false
    },
    {
      "id": 3,
      "content": "GET and POST are the most important methods of HTTP protocol",
      "date": "2022-01-17T19:20:14.298Z",
      "important": false
    }
]

app.get('/', (request, response)=>{
  response.send('<h1>Hello</h1>')

})
app.get('/api/notes', (req, res)=>{
  res.json(notes)
})

app.get('/api/notes/:id', (request, response)=>{
  const id = Number(request.params.id)
  console.log(id)
  const note =  notes.find(note => note.id == id)
  console.log(note)
  if(note){
  response.json(note)
  }{
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response)=>{
  const id = Number(request.params.id)
  notes =notes.filter(note=> note.id !==id)
    response.status(204).end()


})
const generateid =()=>{
  const maxid = notes.length >0 ? Math.max(... notes.map(n=>n.id)):0
  return maxid +1
  
}
app.post('/api/notes', (request, response)=>{
  const body = request.body
  if(!body.content){
    return response.status(404).json({
      error:'content missing'
    })
  }

  const note ={
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id:generateid(),

  }
  
  
  notes = notes.concat(note)
  console.log(note)
  response.json(note)
})



const PORT = process.env.PORT || 3001

app.listen(PORT, ()=>{
console.log(`Server running on port ${PORT}`)


})
