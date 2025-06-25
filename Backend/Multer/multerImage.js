const multer = require("multer");
const path = require("path");

let Storage = multer.diskStorage({
  
  destination: "uploads",
  
  filename: (req, file, cb) => {
    
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random * 1e9);
    
    cb(null, uniqueSuffix+path.extname(file.originalname));
  },

});

const upload = multer({ storage: Storage });

module.exports = upload;