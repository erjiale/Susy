const router = require("express").Router();
const pool = require("../../db");
const verify = require("../verifyToken");

router.post("/:pid", verify, async (req, res) => {
  try {
    uid = req.user.uid;
    pid = req.params.pid;

    const alreadyInCart = await pool.query(
      "SELECT * FROM carrito WHERE uid=$1 AND pid=$2",
      [uid, pid]
    );

    // Check if item already added into cart => quantity++;
    if (alreadyInCart.rowCount) {
      const updatedItem = await pool.query(
        "UPDATE carrito SET cantidad=$1 WHERE uid=$2 AND pid=$3 RETURNING *",
        [alreadyInCart.rows[0].cantidad + 1, uid, pid]
      );
      return res.send(updatedItem.rows[0]);
    }
    // If NOT Added => ADD it
    await pool.query("INSERT INTO carrito (uid, pid) VALUES($1, $2)", [
      uid,
      pid,
    ]);
    // Retrieve the Added Product
    const addedProduct = await pool.query(
      "SELECT carrito.cantidad, carrito.pid, productos.nombre, productos.img, productos.precio FROM carrito INNER JOIN productos ON carrito.pid=productos.pid WHERE uid=$1 AND carrito.pid=$2",
      [uid, pid]
    );
    return res.send(addedProduct.rows[0]);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Error del servidor" });
  }
});

module.exports = router;
