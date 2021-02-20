const mongoose = require('mongoose')

//to initialise a schema
const Schema = mongoose.Schema

//creating customized schema for our database
const FeedSchema = new Schema({
    imageUrl: {
        type: String,
        required: true
    },
    caption:{
        type:String,
        required: true
    },
    blurhashcode:{
        type:String,
        required: true
    },
    aspectRatio:{
        type: Number,
        required: true

    }
})

const FeedModel = mongoose.model('Images', FeedSchema)
module.exports = FeedModel