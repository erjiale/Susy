const router = require("express").Router();
const jwt = require("jsonwebtoken");
const pool = require("../../db");

router.patch("/:token", async (req, res) => {
  try {
    const verifyEmail = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
    await pool.query("UPDATE usuarios SET verificado=$1 WHERE email=$2", [
      true,
      verifyEmail.email,
    ]);
    return res.send({ Email: "Verificado exitosamente!" });
  } catch (err) {
    return res.status(400).send("Token inválido!");
  }
});

module.exports = router;
