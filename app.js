const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

require('./controllers/init_mongodb')
const PORT = process.env.PORT || 3000
const app = express()

app.use('/uploads',express.static(__dirname+'/uploads'))
app.use(cors())
const ImageRoute = require('./routes/routes')

app.get('/',(req,res)=>{
    res.send('Hello')
})

app.use('/ImagesApi',ImageRoute)


app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}..`)
})