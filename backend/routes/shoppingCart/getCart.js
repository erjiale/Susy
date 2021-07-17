const router = require("express").Router();
const pool = require("../../db");
const verify = require("../verifyToken");

// GET own Shopping CART products and quantities;
router.get("/", verify, async (req, res) => {
  try {
    const cartItems = await pool.query(
      "SELECT carrito.cantidad, carrito.pid, productos.nombre, productos.img, productos.precio FROM carrito INNER JOIN productos ON carrito.pid=productos.pid WHERE uid=$1",
      [req.user.uid]
    );
    return res.send(cartItems.rows);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Error del servidor" });
  }
});

module.exports = router;
