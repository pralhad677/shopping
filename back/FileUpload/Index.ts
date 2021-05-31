import multer from 'multer'
import path from 'path'
var storage = multer.diskStorage({
  destination: function (req:any, file:any, cb:any) {
    cb(null, 'public/Images')
  },
  filename: function (req:any, file:any, cb:any) {
    cb(null, file.fieldname+'-'+new Date().toLocaleString('en-Us',{  year: 'numeric', month: 'long', day: 'numeric'})+Math.ceil(Math.random())+path.extname(file.originalname))
  }
}) 

const fileFilter = (req:any,file:any,cb:any)=>{
    if(file.mimetype.startsWith('image')){
          cb(null,true)
    }
    else{
        // cb(new AppError('given file is not an image',400),false)
      cb('given file is not an image')
    }
}
 
export const upload = multer(
    { 
        storage,
      fileFilter
  })