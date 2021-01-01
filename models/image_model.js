const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ImageSchema = new Schema({
    imageUrl:{
        type: String,
        required: true
 
    },
   
})
const ImageModel = mongoose.model('Images',ImageSchema)
module.exports= ImageModel