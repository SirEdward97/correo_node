const User = require("../models/User");
const Client = require("../models/Client");
const { sendEmail } = require("../services/emailServices");
const bcrypt = require("bcrypt");

exports.registerUserAndClient = async (req, res) => {
  try {
    const { correo, contrasena, rol, nombre, telefono } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

    const newUser = new User({ 
      correo, 
      contrasena: hashedPassword, 
      rol 
    });
    await newUser.save();

    const newClient = new Client({ correo, nombre, telefono });
    await newClient.save();

    // Estructura del correo en HTML con la imagen de bienvenida incrustada
    const asunto = "¡Bienvenido a nuestra plataforma!";
    const htmlMensaje = `
      <div style="font-family: Arial, sans-serif; text-align: center; color: #333;">
        <h2>¡Hola ${nombre}, qué gusto tenerte por acá! </h2>
        <p>Tu registro se ha completado de manera exitosa con el rol de: <strong>${rol}</strong>.</p>
        
        
        
        <img src="cid:imagenBienvenida" alt="Bienvenida" style="width: 100%; max-width: 400px; border-radius: 10px;" />
        
        <p style="margin-top: 20px; font-size: 12px; color: #777;">Este es un correo automático, por favor no lo respondas.</p>
      </div>
    `;
    
    // Llamamos al servicio enviando el HTML en lugar de texto plano
    await sendEmail(correo, asunto, htmlMensaje);

    res.send("¡Usuario registrado con éxito y correo de bienvenida con imagen enviado!");
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).send("Hubo un error al procesar el registro.");
  }
};