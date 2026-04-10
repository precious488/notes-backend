require('dotenv').config()
const mongoose = require('mongoose')

// const password = process.argv[2]

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URL
console.log('connecting to', url)

// const url = 'mongodb://localhost:27017/notes'

mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

noteSchema.set('toJSON',{
  transform:(document, returnedObject)=>{
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id 
     delete returnedObject.__v
  }
})


module.exports = mongoose.model('Note', noteSchema)
