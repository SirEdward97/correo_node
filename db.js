// db.js
const dns = require("dns");

// Forzamos los DNS públicos para evitar el error ECONNREFUSED en Atlas
try {
  dns.setServers(["1.1.1.1", "8.8.8.8"]);
} catch (e) {
  console.log("No se pudieron establecer los DNS personalizados", e);
}

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("¡Conectado a MongoDB exitosamente!");
  } catch (err) {
    console.error("Error conectando a MongoDB:", err);
    process.exit(1); // Detiene la aplicación si la BD falla
  }
};

module.exports = connectDB;