const { Schema, model } = require("mongoose");

const anuncioSchema = new Schema({
  tipo: {
    type: String,
    enum: ["instrumento", "servicio"],
    required: [true, 'Este campo es obligatorio']
  },
  familia: {
    type: String,
    enum: [
      "cuerda frotada",
      "cuerda percutida",
      "viento metal",
      "viento madera",
      "percusion",
      "banda",
      "orquesta",
      "charanga",
      "solista",
    ],
    required: [true, 'Este campo es obligatorio']
  },
  marca: {
    type: String,
    enum: ["Thoman", "Yamaha", "Fender", "Casio", "Bach", "Roland", "Stentor"]
  },
  modelo: {
    type: String
  },
  costo: {
    type: Number,
    required: [true, 'Este campo es obligatorio']
  },
  estado: {
    type: String,
    enum: ["Nuevo", "Seminuevo", "Bueno", "Correcto"]
  },
  dueño: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  photos: [String]
});

const Anuncio = model('Anuncio', anuncioSchema)
module.exports = Anuncio