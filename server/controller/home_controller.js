
const fs = require('fs').promises;
const { PDFDocument } = require("pdf-lib");
const crypto = require("crypto")
const path = require("path");

const uploadedFiles = [];

const uploadPdf = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(404).json({ message: "No File Found" });
        }
        next();
    } catch (err) {
        console.log(err);
    }
};

const mergeUploadedFiles = async (req, res) => {
    try {
        const readFiles = path.join(__dirname, '..','uploads', req.file.filename);
        const coverPage = await newCoverPage(req.file.originalname, req.file.filename);
        const mergedFile = await mergePdf(readFiles, coverPage);
        
        const mergedFileName = `merged-with-cover-${req.file.filename}`;
        
        uploadedFiles.push({id: crypto.randomBytes(4).toString('hex'), filename: req.file.filename,mergedfile: mergedFileName});
        
        await fs.writeFile(path.join(__dirname, '..','cover', mergedFileName), mergedFile);
        
        return res.status(201).send({ message: "Merged and uploaded the file" });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};

const newCoverPage = async (originalFileName, fileName) => {
    try {
        const doc = await PDFDocument.create();
        const page = doc.addPage([600, 800]);
        const { width, height } = page.getSize();
        page.drawText(`Cover Page: `, {x: width / 5, y: height / 1.2})
        page.drawText(`Filename: ${originalFileName}`, { x: width / 5, y: height / 1.6 });
        page.drawText(`File save name: ${fileName}`, { x: width / 5, y: height / 1.7 })
        return doc.save();
    } catch (err) {
        console.log(err);
    }
};

const mergePdf = async (pdf, coverPage) => {
    try {
        const doc = await PDFDocument.load(await fs.readFile(pdf));
        const docCoverPage = await PDFDocument.load(coverPage);

        const [cp] = await doc.copyPages(docCoverPage, [0]);
        doc.insertPage(0, cp);

        return doc.save();
    } catch (err) {
        console.log(err);
    }
};

const getPdfFiles = (req, res) => {
    res.send(uploadedFiles);
}


const getSpecificFile =  (req, res) => {
    const id = req.params.id;
    for(file of uploadedFiles) {
        if (file.id === id) {
            return res.status(201).send(file);
        }
    }
}

const deleteSpecificFile = async (req, res) => {
    const id = req.params.id;
    try {
        for (file of uploadedFiles) {
            if (file.id === id) {
                const idx = uploadedFiles.findIndex(item => item.id === file.id)
                if (idx !== -1) {
                    uploadedFiles.splice(idx, 1);
                }
                
                await fs.unlink(path.join(__dirname, "..", "cover", file.mergedfile));
                await fs.unlink(path.join(__dirname, "..", "uploads", file.filename));
            }
        }
        return res.status(200).json({message: "Successfully Deleted The file"})
    } catch (err) {
        console.og(err);
    }
}

module.exports = {
    uploadPdf,
    mergeUploadedFiles,
    getPdfFiles,
    getSpecificFile,
    deleteSpecificFile
}