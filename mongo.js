const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://befehprecious_db_user:${password}@cluster0.xogpld0.mongodb.net/?appName=Cluster0`
mongoose.set('strictQuery', false)

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


const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//   content: 'HTML is easy',
//   important: true,
// })

// note.save().then(result => {
//   console.log('note saved!', result)
//   mongoose.connection.close()
// })

Note.find({}).then(result=>{
    result.forEach(note=>{
        console.log(note)
        console.log('result')
    })
    mongoose.connection.close()
})