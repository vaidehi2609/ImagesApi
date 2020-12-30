const express = require('express')
const path = require('path')
const { version } = require('mongoose')
const uploadImg = require('../controllers/image_upload')
const router = express.Router()
const model = require('../models/image_model')
const cors = require('cors')


router.post('/upload',uploadImg ,async(req,res,next)=>{
    
   const file = req.file
   if(!file){
       const error = new Error('no Images')
       error.status = 400
       return next('error')
   }
   const image = new model({
       imageUrl: file.path
       
   })
   const savedImage = await image.save()
   res.json(savedImage)
})
router.get('/image',async()=>{
    const Image = await model.find()
    res.json(Image)
})
module.exports = router