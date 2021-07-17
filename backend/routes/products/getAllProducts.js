const router = require("express").Router();
const pool = require("../../db");

// Returns all products from "productos" TABLE
router.get("/", async (req, res) => {
  try {
    const allProducts = await pool.query("SELECT * FROM productos");
    return res.send(allProducts.rows);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error del servidor");
  }
});

module.exports = router;
