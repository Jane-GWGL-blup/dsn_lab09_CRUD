const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Contactos = new Schema ({
        nombre:    { type: String, required: true },
        apellido:  { type: String, required: true },
        imagen:    { type: String},
        telefono:  { type: Number},
        email:     { type:String, required: true, unique: true},
        direccion: { type:String, required: true,}

});

module.exports = mongoose.model('Contactos', Contactos)