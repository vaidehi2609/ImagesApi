const mongoose = require('mongoose')
//to initialise a schema
const Schema = mongoose.Schema

//creating customized schema for our database
const ImageSchema = new Schema({
    imageUrl: {
        type: String,
        required: true

    },

})
const ImageModel = mongoose.model('Images', ImageSchema)
module.exports = ImageModel