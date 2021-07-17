const router = require("express").Router();
const pool = require("../../db");
const verify = require("../verifyToken");
// const fs = require("fs");
const aws = require("aws-sdk");

aws.config.update({
  secretAccessKey: process.env.S3_ACCESS_KEY_SECRET,
  accessKeyId: process.env.S3_ACCESS_KEY,
  region: "us-east-1",
});

const s3 = new aws.S3();

router.delete("/:pid", verify, async (req, res) => {
  const pid = req.params.pid;
  if (req.user.isAdmin) {
    try {
      // DELETE those products in any user's Shopping CART WHERE pid=pid
      await pool.query("DELETE FROM carrito WHERE pid=$1 RETURNING *", [pid]);

      // DELETE actual product from productos table;
      const deleteProduct = await pool.query(
        "DELETE FROM productos WHERE pid=$1 RETURNING *",
        [pid]
      );
      if (deleteProduct.rowCount > 0) {
        // Delete img File from AWS S3 Bucket
        await s3.deleteObject(
          {
            Bucket: "susys-images",
            Key: deleteProduct.rows[0].img,
          },
          function (err, data) {
            if (err)
              return res
                .status(400)
                .send({ error: "Error al eliminar imagen de aws s3" });
          }
        );
        // fs.unlinkSync("uploads/" + deleteProduct.rows[0].img);
        return res.send("Producto eliminado");
      }
      return res.status(404).send({ error: "Producto no existe" });
    } catch (err) {
      console.log(err);
      return res.status(500).send("Error del servidor");
    }
  }
  return res.send("Acceso restringido. Solo Admin autorizado");
});

module.exports = router;
