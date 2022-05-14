const multer = require("multer")
const path = require("path")
const jsonfile = require("jsonfile")
const File = require("../models/file")
const AsyncHandler = require("express-async-handler")

const config = jsonfile.readFileSync("config/upload.json")

// define multer disk storage

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, process.env.UPLOAD_PATH || "public/uploads")
	},

	filename: function (req, file, cb) {
		const ext = path.extname(file.originalname) // get file's extension
		const fileName = path.basename(file.originalname, ext) // get file's name without ext
		cb(null, `${fileName}-${Date.now()}${ext}`)
	},
})

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 20 * 1024 * 1024, // 20 MB per file
	},
	fileFilter: function (req, file, cb) {
		// check file type
		const ext = path.extname(file.originalname).slice(1)
		if (config.acceptedExtensions.includes(ext)) {
			cb(null, true)
		} else {
			cb(new Error("File extension not accepted"))
		}
	},
})

const uploadController = async (req, res, next) => {
	const { files } = req

	if (!files || files.length === 0) next()

	// attach user's id to each file
	for (let i = 0; i < files.length; i++) {
		files[i] = {
			user: req.user.id,
			...files[i],
		}
	}

	const savedFiles = await File.insertMany(files)

	req.body = JSON.parse(req.body.data)

	// change files info to file id in req.files array
	req.files = savedFiles.map((val) => val.id)
	next()
}

module.exports = {
	upload,
	uploadController,
}
