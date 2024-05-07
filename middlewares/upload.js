const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("hello: ", file);
    if (file.fieldname === "schoolProfilePhoto") {
      cb(null, "public/images");
    } else if (file.fieldname === "coverPhoto") {
      cb(null, "public/images");
    } else if (file.fieldname === "images[]") {
      cb(null, "public/gallery");
    }
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage, limits: { fieldSize: 25 * 1024 * 1024 } });

module.exports = upload;
