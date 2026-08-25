const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.GUSER}`,
    pass: `${process.env.GPASS}`,
  },
});

// Función exportada para ser reutilizada en cualquier parte del proyecto
exports.sendEmail = async (email, subject, text) => {
  const mailOptions = {
    from: `${process.env.GUSER}`,
    to: email,
    subject: subject,
    text: text,
  };

  // Nota: Usamos una promesa o dejamos el callback tal cual lo trajiste
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error al enviar correo:", err);
    } else {
      console.log("Correo enviado: " + info.response);
    }
  });
};