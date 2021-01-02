const express = require('express')
const uploadImg = require('../controllers/image_upload')
const router = express.Router()
const ImageModel = require('../models/image_model')


//post method for uploading images
router.post('/upload', uploadImg.any('image'), async (req, res, next) => {

    try {
        const files = req.files[0].path

        //console.log({file})


        const image = new ImageModel({
            imageUrl: `http://localhost:3000/${files}`

        })
        const savedImage = await image.save()
        res.json(savedImage)
        //console.log(savedImage)
    } catch (error) {
        const files = req.files
        if (!files) {
            error = new Error('no Images')
            error.status = 400
            return next('error')
        }
        next(error)
    }
})

//get method for getting all the entries in database
router.get('/imageList', async (req, res) => {
    ImageModel.find({}, (err, images) => {
        if (err) {
            res.send("something went wrong");
            next();
        }
        res.json(images)
    })
})
//router.get('/image',async(req,res)=>{
//  console.log(req.path)
//    console.log('here')
//    const Image = await ImageModel.find(req.path)
//   res.json(Image)


//})

module.exports = router