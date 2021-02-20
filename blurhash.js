//import encode funtion from the blurhash module
const { encode } = require('blurhash')
//import canvas and image 
const { createCanvas, Image } = require('canvas')

//for loading the image which will later be converted into a string
const loadImage = async src =>
    new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (...args) => reject(args);
        img.src = src;
    });

//retrieving the specific of the image we loaded
const getImageData = image => {
    //canvas for the image
    const canvas = createCanvas(image.width, image.height);
    //specifying the context 
    const ctx = canvas.getContext('2d');
    //drawing the image
    ctx.drawImage(image, 0, 0);
    return ctx.getImageData(0, 0, image.width, image.height);
};

//encoding the image into a blurhash string
exports.handler = async imageUrl => {
    const image = await loadImage(imageUrl);
    const imageData = getImageData(image);

    return encode(imageData.data, imageData.width, imageData.height, 4, 4);
  };

 