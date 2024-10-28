const {Schema, model} = require('mongoose');

//dedinir el articulo (modelo)
const AritculoSchema= Schema({
    titulo: {
        type: String,
        required: true
    },
    contenido: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    imagen:{
        type: String,
        default: "default.png"
    }
});

module.exports= model("Articulo", AritculoSchema, "articulos");