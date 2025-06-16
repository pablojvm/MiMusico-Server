const { Schema, model } = require("mongoose");

const adSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["instrument", "service"],
      required: [true, "Este campo es obligatorio"],
    },
    family: {
      type: String,
      enum: [
        "Cuerda Frotada",
        "Cuerda Percutida",
        "Viento Metal",
        "Viento Madera",
        "Percusión",
        "Banda",
        "Orquesta",
        "Charanga",
        "Solista",
      ],
      required: [true, "Este campo es obligatorio"],
    },
    brand: {
      type: String,
      enum: [
        "Thoman",
        "Yamaha",
        "Fender",
        "Casio",
        "Bach",
        "Roland",
        "Stentor",
        ""
      ],
    },
    title: String,
    model: {
      type: String,
    },
    cost: {
      type: Number,
      required: [true, "Este campo es obligatorio"],
    },
    state: {
      type: String,
      enum: ["Nuevo", "Seminuevo", "Bueno", "Correcto", ""],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    photos: [String],
    description: String
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Ad = model("Ad", adSchema);
module.exports = Ad;
