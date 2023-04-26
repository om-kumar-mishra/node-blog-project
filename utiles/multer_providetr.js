const  multer=require("multer")
const  path=require("path")
//configuration of multer
let storage=multer.diskStorage(
    {
        destination:function(request, file,callback)
        {
            // console.log("_dirname ="+path.join(__dirname,'..',"image"))
              callback(null, path.join(__dirname,'..',"public","userimage"));             
           
        },
        filename:function(request,file,callback)
        {
            
           callback(null,file.originalname);
        }
    })
    
    const upload=multer({storage:storage});

    module.exports=upload