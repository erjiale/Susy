const router = require("express").Router();
const pool = require("../../db");
const verify = require("../verifyToken");

// Remove ONE Quantity from a PRODUCT in Shopping CART
router.patch("/:pid", verify, async (req, res) => {
  try {
    uid = req.user.uid;
    pid = req.params.pid;

    // Check if PRODUCT Exists
    const itemExists = await pool.query(
      "SELECT * FROM carrito WHERE uid=$1 AND pid=$2",
      [uid, pid]
    );
    // If PRODUCT Not Found => return 404
    if (!itemExists.rowCount)
      return res.status(404).send({ Producto: "No existe" });

    // If Found && (quantity-- < 0) => DELETE Product FROM carrito;
    if (itemExists.rows[0].cantidad - 1 <= 0) {
      const deletedProduct = await pool.query(
        "DELETE FROM carrito WHERE uid=$1 AND pid=$2 RETURNING *",
        [uid, pid]
      );
      // FRONT-END: check if the redux state cantidad===action.payload.cantidad => then DELETE FROM redux state
      return res.send(deletedProduct.rows[0]);
    }
    // If Found && (quantity-- > 0) => quantity--;
    const updatedProduct = await pool.query(
      "UPDATE carrito SET cantidad=$1 WHERE uid=$2 AND pid=$3 RETURNING *",
      [itemExists.rows[0].cantidad - 1, uid, pid]
    );
    return res.send(updatedProduct.rows[0]);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Error del servidor" });
  }
});

module.exports = router;
