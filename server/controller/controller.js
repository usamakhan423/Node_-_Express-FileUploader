// Controller file to follow the MVC architecture
const UploadModel = require('../model/schema')
const fs = require('fs')

exports.home = (req, res)=> {
  res.render('main')
}

exports.uploads = (req, res, next)=> {
  const files = req.files;

  if(!files){
    const error = new Error('Please choose files!')
    error.httpStatusCode = 400
    return next(error)
  }

  // convert images into based64 encoding
  let imgArray = files.map((file)=> {
    let img = fs.readFileSync(file.path)

    return encode_image =  img.toString('base 64')
  })

  let result = imgArray.map((src, index)=> {
    // create object to store data in the collections
    let finalImg = {
      filename : files[index].originalname,
      contentType: files[index].mimetype,
      imageBase64: src
    }

    let newUpload = new UploadModel(finalImg)
    return newUpload
      .save()
      .then(()=> {
        return { msg: `${files[index].originalname} Uploaded successfully`}
      })
      .catch((err)=> {
        if(err){
          if(err.name === 'MongoError' && err.code === 11000)
          return Promise.reject({err : `Duplicate ${files[index].originalname}. File already exists`})
        }
        return Promise.reject({ err: err.message || `Cannot upload ${files[index].originalname}, somethig missing`})
      })
  })

  Promise.all(result)
    .then(msg => {
      res.json(msg)
      // res.redirect('/')
    })
    .catch(err => {
      res.json(err)
    })
}