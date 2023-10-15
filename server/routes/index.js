const express = require("express")
const router = express.Router();
const {uploadPdf, mergeUploadedFiles, getPdfFiles} = require("../controller/home_controller");
const upload = require("../middleware/multer");

router.post("/", upload.single("pdfFile"), uploadPdf, mergeUploadedFiles);
router.get("/", getPdfFiles);

module.exports = router;