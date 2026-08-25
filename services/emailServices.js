const nodemailer = require("nodemailer");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GUSER, // Sin comillas invertidas ni extrañas
    pass: process.env.GPASS, // Lee directamente la variable del .env
  },
});

exports.sendEmail = async (email, subject, htmlContent) => {
  const mailOptions = {
    from: process.env.GUSER, // Usamos la variable sin comillas
    to: email,
    subject: subject,
    html: htmlContent,
    attachments: [
      {
        filename: 'bienvenida.jpg',
        path: path.join(__dirname, '../public/bienvenida.jpg'), // Asegúrate de tener la carpeta 'public' y la imagen 'bienvenida.jpg'
        cid: 'imagenBienvenida' 
      }
    ]
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error al enviar correo:", err);
    } else {
      console.log("Correo enviado con imagen: " + info.response);
    }
  });
};