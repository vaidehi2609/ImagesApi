const express = require('express')
const path = require('path')
const uploadImg = require('../controllers/image_upload')
const router = express.Router()
const ImageModel = require('../models/image_model')



router.post('/upload',uploadImg.any('image') ,async(req,res,next)=>{
    
   try {
    const file = req.files
    const files = file[0].path
    console.log({file})
   
   
    const image = new ImageModel({
       imageUrl: `http://localhost:3000/image/${files}`
        
    })
   const savedImage = await image.save()
    res.json(savedImage)
    console.log(savedImage)
   } catch (error) {
    const file = req.files
    if(!file){
         error = new Error('no Images')
        error.status = 400
        return next('error')
    }
       next(error)
   }
})

router.get('/imageList',async(req,res)=>{
    ImageModel.find({},(err,images)=>{
        if(err){
            res.send("something went wrong");
            next();
        }
        res.json(images)
    })
})
router.get('/image',async(req,res)=>{
    console.log(req.path)
    console.log('here')
    const Image = await ImageModel.find(req.path)
   res.json(Image)
   

})

module.exports = router