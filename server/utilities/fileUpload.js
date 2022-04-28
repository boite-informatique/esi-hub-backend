const multer = require('multer')
const path = require('path')
const jsonfile = require('jsonfile')

const config = jsonfile.readFileSync('../config/upload.json')

// define multer disk storage

const storage = multer.diskStorage({

  destination : function(req, file, cb) {
    cb(null, process.env.UPLOAD_PATH || '../uploads')
  },

  filename : function(req, file, cb) {
    const ext = path.extname(file.originalname) // get file's extension
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`)
  }
})

const upload = multer({
  storage : storage,
  limits : {
    fileSize : 20 * 1024 * 1024 // 20 MB per file
  },
  fileFilter : function(req, file, cb) {
    // check file type
    const ext = path.extname(file.originalname)
    if (config.acceptedExtensions.includes(ext)) {
      cb(null, true)
    } else {
      cb(new Error('File extension not accepted'))
    }
  }
})