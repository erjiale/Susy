const pool = require("../../db");
const router = require("express").Router();
const verify = require("../verifyToken");

router.delete("/:email", verify, async (req, res) => {
  const email = req.params.email;

  try {
    if (email === req.user._id) {
      await pool.query("DELETE FROM usuarios WHERE email = $1", [email]);
      return res.json({ éxito: `la cuenta de ${email} ha sido eliminado` });
    } else {
      return res
        .status(400)
        .send("No está permitido eliminar la cuenta de otro usuario");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error del servidor");
  }
});

module.exports = router;
