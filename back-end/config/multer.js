const multer = require("multer");
const { uuid } = require('uuidv4');

const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (req.url === "/image/product")
      cb(null, "public/productImages");
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + "-" + uuid() + path.extname(file.originalname);
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);

    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.avif' && ext !== '.webp') {
      return callback(new Error('Tipo de arquivo não suportado!'))
    }
    callback(null, true)
  },
  limits: {
    fileSize: 1024 * 1024
  }
});

module.exports.upload = upload;