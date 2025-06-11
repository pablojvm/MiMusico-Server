const { Schema, model } = require("mongoose");

const reseñaSchema = new Schema({
    titulo: {
        type: String,
        required: [true, 'Este campo es obligatorio']
    },
    texto:{
        type: String,
        required: [true, 'Este campo es obligatorio'],
        minlength: 15
    },
    puntuacion:{
        type: Number,
        required: [true, 'Este campo es obligatorio'],
        enum: ['1', '2', '3', '4', '5']
    },
    creador:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    anuncio:{
        type: Schema.Types.ObjectId,
        ref: 'Anuncio'
    }
})

const Reseña = model('Reseña', reseñaSchema);
module.exports = Reseña;