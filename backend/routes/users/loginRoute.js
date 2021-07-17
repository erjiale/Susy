const router = require("express").Router();
const pool = require("../../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const usuario = req.body.usuario;
  const contra = req.body.contra;
  if (usuario.length === 0 && contra.length === 0)
    return res.status(400).send({
      usuario: "Este campo no puede estar vacío",
      contra: "La contraseña es obligatoria",
    });
  else if (contra.length === 0)
    return res.status(400).send({ contra: "La contraseña es obligatoria" });
  else if (usuario.length === 0)
    return res.status(400).send({ usuario: "Este campo no puede estar vacío" });

  try {
    const user = await pool.query("SELECT * FROM usuarios WHERE usuario=$1", [
      usuario,
    ]);
    // Check if User exists
    if (user.rowCount === 0)
      return res.status(404).send({ usuario: "Este usuario no existe" });

    // Check if Account is VERIFIED
    if (!user.rows[0].verificado)
      return res.status(400).send({ error: "Verifique su correo eletrónico" });
    // Check the password matches the one in our db
    const comparison = await bcrypt.compare(contra, user.rows[0].contra);
    if (comparison) {
      const token = jwt.sign(
        {
          uid: user.rows[0].uid,
          email: user.rows[0].email,
          isAdmin: user.rows[0].admin,
          username: user.rows[0].usuario,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      res.header("auth-header", token).send({ token: token });
    } else return res.status(400).send({ error: "Credenciales incorrectas" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Error del servidor" });
  }
});

module.exports = router;
