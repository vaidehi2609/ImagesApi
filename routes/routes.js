const express = require('express')
const uploadImg = require('../controllers/image_upload')
const router = express.Router()
const FeedModel = require('../models/feed_model')
const { handler: encodeImageToBlurhash } = require('../blurhash')
var sizeOf = require('image-size')
//post method for uploading images
router.post('/upload', uploadImg.any('image'), async (req, res, next) => {

    const file = req.files[0].path
    console.log(req.files[0])

    //Checking if request doesn't contain an image
    if (!file) {
        error = new Error('no Images')
        error.status = 400
        return next(error)
    }
    //getting height and width of image
     const dimensions =sizeOf(file)
     const aspectRatio = dimensions.width/dimensions.height
    //for the blurry placeholder
    const hashcode = await encodeImageToBlurhash(`http://localhost:3000/${file}`)

    //Trying to save the image
    try {
        const image = new FeedModel({
            imageUrl: `http://localhost:3000/${file}`,
            caption: req.body.caption,
            blurhashcode: hashcode,
            aspectRatio:aspectRatio

        })
        const savedImage = await image.save()

        //Returning the link to new saved image
        //console.log(savedImage)
        res.json(savedImage)

    } catch (error) {
        //Resolving error
        next(error)
    }
})

//get method for getting all the entries in database
router.get('/imageList', async (req, res) => {

    //Querying to get list of all the images
    FeedModel.find({}, (error, images) => {

        if (error) {
            res.send("something went wrong");
            next(error);
        }

        //Sending list of images in JSON format
        res.json({ images })
    })

})


//router.get('/image',async(req,res)=>{
//  console.log(req.path)
//    console.log('here')
//    const Image = await ImageModel.find(req.path)
//   res.json(Image)


//})

module.exports = router