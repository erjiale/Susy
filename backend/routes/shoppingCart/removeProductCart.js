const router = require("express").Router();
const pool = require("../../db");
const verify = require("../verifyToken");

router.delete("/:pid", verify, async (req, res) => {
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

    // If Found => DELETE Product FROM carrito;
    const deletedItem = await pool.query(
      "DELETE FROM carrito WHERE uid=$1 AND pid=$2 RETURNING *",
      [uid, pid]
    );
    return res.send(deletedItem.rows[0]);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Error del servidor" });
  }
});

module.exports = router;
