const express = require("express")
const router = express.Router();
const {uploadPdf, mergeUploadedFiles, getPdfFiles, getSpecificFile, deleteSpecificFile} = require("../controller/home_controller");
const upload = require("../middleware/multer");

router.post("/", upload.single("pdfFile"), uploadPdf, mergeUploadedFiles);
router.get("/", getPdfFiles);
router.get("/:id", getSpecificFile);
router.delete("/:id", deleteSpecificFile);


module.exports = router;