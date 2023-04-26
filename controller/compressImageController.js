// import imagemin from 'imagemin';
// import imageminJpegtran from 'imagemin-jpegtran';
// import imageminPngquant from 'imagemin-pngquant';
//  const y = require('../image/')
const sharp = require('sharp');
 compressImage=async(req,res)=>{
    console.log("file name =================",req.file)

    // const files = await imagemin(['/userimage/01.jpg'], {
    //     destination: 'build/images',
    //     plugins: [
    //         imageminJpegtran(),
    //         imageminPngquant({
    //             quality: [0.6, 0.8]
    //         })
    //     ]
    // })
    
    // console.log(files)


    sharp(`D:/brand/public/userImage/${req.file.filename}`)
  //.resize(320, 240)
  .toFile(`image/${req.file.filename}+${Date.now()}`, (err, info) => {
         console.log("info==",info)
         console.log("error ==",err)
         res.send(info)
   });
    //=> [{data:
}


getImagecompressImage=(req,res)=>{
   res.render("compressImage")
}

module.exports = { compressImage,getImagecompressImage}