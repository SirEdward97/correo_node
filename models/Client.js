const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  correo: { type: String, required: true },
  nombre: { type: String, required: true },
  telefono: { type: String, required: true }
});

module.exports = mongoose.model("Client", clientSchema);