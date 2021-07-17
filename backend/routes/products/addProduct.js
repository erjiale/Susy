const pool = require("../../db");
const router = require("express").Router();
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

const verify = require("../verifyToken");

/*********** UPLOAD Image File To AWS S3 Bucket***********/
aws.config.update({
  secretAccessKey: process.env.S3_ACCESS_KEY_SECRET,
  accessKeyId: process.env.S3_ACCESS_KEY,
  region: "us-east-1",
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("only jpeg and png files accepted"), false);
  }
};

const upload = multer({
  storage: multerS3({
    fileFilter: fileFilter,
    s3: s3,
    bucket: "susys-images",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now().toString() + ".png");
    },
  }),
});

/**********  For STORING files LOCALLY **********/
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now() + ".png");
//   },
// });
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//     cb(null, true);
//   } else {
//     cb(new Error("only jpeg and png files accepted"), false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1024 * 1024 * 5 }, // accept files up to 5MB
//   fileFilter: fileFilter,
// });

router.post("/", verify, upload.single("img"), async (req, res) => {
  // console.log(req.file); // multer gives you access to 'req.file' and 'req.body' too
  if (req.user.isAdmin) {
    try {
      const newProduct = await pool.query(
        "INSERT INTO productos(nombre, precio, img) VALUES($1, $2, $3) RETURNING *",
        // [req.body.nombre, req.body.precio, req.file.filename]
        [req.body.nombre, req.body.precio, req.file.key]
      );
      return res.send(newProduct.rows[0]);
      // INSERT INTO products table NEW PRODUCT;
    } catch (err) {
      console.log(err);
      return res.status(500).send("Error del servidor");
    }
  }
  return res.send("Acceso restringido. Solo Admin autorizado");
});

module.exports = router;
