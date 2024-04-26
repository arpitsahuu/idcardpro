const  multer = require("multer")

const storage = multer.memoryStorage();

// const upload = multer({ storage: storage }).single("file");

const upload = multer({ storage: storage }).array("file", 20); 

module.exports = upload;