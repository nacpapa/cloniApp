// MONGOOSE NOS PERMITE MANEJAR MONGODB, HACER CONSULTAS, QUERIES, ETC
const mongoose = require('mongoose');
// DEFINIMOS EL ESQUEMA PARA LOS POSTEOS
const PostSchema = new mongoose.Schema(
  // DEFINIMOS LOS CAMPOS DE LOS DOCUMENTOS A CARGAR
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    photo: {
      type: String,
    },
    username: {
      type: String,
    },
  },
  { timestamps: true }
);

// EXPORTAMOS EL ESQUEMA POST
module.exports = mongoose.model('Post', PostSchema);
