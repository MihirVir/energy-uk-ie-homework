const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, 'uploads/')
        }
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1]
        // file(first four characters of the original file name)-Date.Now();
        cb(null, `${file.originalname.replace(/\s/g,"").substring(0, 4)}-${Date.now()}.${ext}`);
    }
}) 


const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf'){
            cb(null, true)
        } else {
            console.log("Only pdf file is allowed")
            cb(null, false)
        }
    }, 
})

module.exports = upload;