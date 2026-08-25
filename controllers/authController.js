const User = require("../models/User");
const Client = require("../models/Client");
const { sendEmail } = require("../services/emailService");
const bcrypt = require("bcrypt"); // Importamos bcrypt

exports.registerUserAndClient = async (req, res) => {
  try {
    // 1. Extraemos los datos del formulario
    const { correo, contrasena, rol, nombre, telefono } = req.body;

    // 2. Encriptar la contraseña (hash)
    // El número 10 es el "saltRounds", que define qué tan seguro (y pesado) es el cifrado
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

    // 3. Creamos el usuario usando la contraseña encriptada (hashedPassword)
    const newUser = new User({ 
      correo, 
      contrasena: hashedPassword, // <--- Aquí guardamos la contraseña oculta
      rol 
    });
    await newUser.save();

    // 4. Creamos el documento en la colección clientes
    const newClient = new Client({ correo, nombre, telefono });
    await newClient.save();

    // 5. Si todo sale bien, enviamos el correo de notificación
    const asunto = "¡Registro exitoso!";
    const mensaje = `Hola ${nombre}, tu registro en nuestra plataforma se ha completado exitosamente con el rol de ${rol}.`;
    
    await sendEmail(correo, asunto, mensaje);

    // 6. Respondemos al navegador
    res.send("¡Usuario registrado con contraseña oculta y cliente creado con éxito!");
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).send("Hubo un error al procesar el registro.");
  }
};