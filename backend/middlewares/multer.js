const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: function(req,file,cb){
       cb(null, path.join(__dirname, "../uploads")); 
    },

    filename: function (req,file,cb){
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
         cb(null, uniqueSuffix + path.extname(file.originalname)); // unique name
    }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const isValidType = allowedTypes.test(file.mimetype);
  if (isValidType) cb(null, true);
  else cb(new Error("Invalid file type"));
};

module.exports = multer({ storage, fileFilter });