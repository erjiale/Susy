const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../../db");
const validator = require("email-validator");
const jwt = require("jsonwebtoken");
const transporter = require("./utils/mailer");

router.post("/", async (req, res) => {
  const contra = req.body.contra;
  const confirmarPW = req.body.confirmarContra;

  // Validating input fields
  if (validator.validate(req.body.email) === false)
    return res
      .status(400)
      .send({ email: "Debe de ser un correo electrónico válido" });
  if (req.body.usuario.length < 4)
    return res
      .status(400)
      .send({ usuario: "Debe de ser al menos 4 carácteres" });
  if (contra.length < 6)
    return res
      .status(400)
      .send({ contraseña: "Debe de ser al menos 6 carácteres" });
  if (contra !== confirmarPW)
    return res.status(400).send({ contraseña: "Las contraseñas no coinciden" });

  // Encrypt the pasword before storing on db
  const salt = await bcrypt.genSalt(10);
  const contraEncriptado = await bcrypt.hash(contra, salt);

  try {
    const user = {
      email: req.body.email,
      usuario: req.body.usuario,
      contra: contraEncriptado,
    };

    // Create account on Database
    await pool.query(
      "INSERT INTO usuarios (email, usuario, contra) VALUES($1, $2, $3) RETURNING *",
      [user.email, user.usuario, user.contra]
    );

    // SEND EMAIL FOR VERIFICATION
    const emailToken = jwt.sign(
      { email: user.email },
      process.env.EMAIL_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // const url = `https://susys.netlify.app/verificar/${emailToken}`;
    const url = `http://localhost:3000/verificar/${emailToken}`;
    const htmlContent = `
      <img src="cid:susysLogo" style="width:250px;" alt="Susy's"/>
      <p>Hola ${user.usuario},</p>
      <p>Gracias por registrarte con nosotros. Verifica tu cuenta para terminar el proceso abriendo este vínculo: </p>
      <a href="${url}">${url}</a>
      <p>Que tenga un gran día,</p>
      <p>Susy's`;

    transporter.sendMail({
      from: "canarianabc@gmail.com",
      to: user.email,
      subject: "Susy's - Verifique Su Cuenta",
      html: htmlContent,
      attachments: [
        {
          filename: "susys.png",
          path: "images/susys.png",
          cid: "susysLogo",
        },
      ],
    });

    // REGISTRATION SUCCESS
    return res.send({ Registración: "exito!" });
  } catch (err) {
    console.log(err);
    // ERROR if Email already exists
    if (err.constraint && err.constraint.split("_")[1] === "email") {
      return res.status(400).send({ email: "Este correo ya está registrado" });
    }
    // ERROR if Username already on use
    else if (err.constraint && err.constraint.split("_")[1] === "usuario")
      return res
        .status(400)
        .send({ usuario: err.constraint.split("_")[1] + " ya está en uso" });
    else return res.status(500).send("Error del servidor");
  }
});

module.exports = router;
