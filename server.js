require("dotenv").config();
const express = require("express");
const path = require("path");

// Importamos nuestra función de conexión a la base de datos
const connectDB = require("./db");
const authController = require("./controllers/authController");

const app = express();
const PORT = process.env.PORT || 9797;

// Ejecutamos la conexión a MongoDB
connectDB();

// Middleware para leer los datos del formulario HTML
app.use(express.urlencoded({ extended: true }));

// Ruta para mostrar el formulario HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "register.html"));
});

// Ruta que recibe los datos del formulario
app.post("/register", authController.registerUserAndClient);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});