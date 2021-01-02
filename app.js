const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

require('./controllers/init_mongodb')
const PORT = process.env.PORT || 3000
const app = express()

//gives access to the uploads folder
app.use('/uploads', express.static(__dirname + '/uploads'))
//for cors errors
app.use(cors())

//for using json
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const ImageRoute = require('./routes/routes')

//home
app.get('/', (req, res) => {
    res.send('Hello')
})

//routing
app.use('/ImagesApi', ImageRoute)

//listen to the port
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}..`)
})