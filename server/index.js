const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoute = require('./routes/auth.route');
const postRoute = require('./routes/posts.route');
const multer = require('multer');
const path = require('path');

// NOS PERMITE HACER ENVIOS A EXPRESS CON EL FORMATO JSON, SE TRATA DE UN MIDDLEWARE
app.use(express.json());
// DEFINIMOS LA RUTA EN LA QUE SE GUARDARAN LAS IMAGENES CARGADAS
app.use('/images', express.static(path.join(__dirname, '/images')));

// NOS CONECTAMOS A LA BASE DE DATOS DE MONGO A TRAVES DE MONGOOSE
mongoose
  .connect('mongodb://localhost:27017/cloniapp')
  .then(console.log('Connected to cliniblog DB'))
  .catch((err) => console.log(err));

// MULTER SERA EL MIDDLEWARE QUE NOS PERMITIRA CARGAR IMAGENES A MONGO DB,
// VAMOS A DEFINIR LA CARPETA EN LA CUAL SE GUARDAN LOS ARCHIVOS CARGADOS
// Y EL NOMBRE CON EL CUAL SE GUARDARAN A TRAVES DE FUNCIONES DE CALLBACK
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

// LE PASAMOS LOS PARAMETROS INDICADOS A MULTER
const upload = multer({ storage: storage });

// DEFINIMOS LA RUTA A TRAVES DE LA CUAL SE CARGARAN LAS IMAGENES
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.status(200).json('File has been uploaded');
});
// DEFINIMOS LAS RUTAS Y LE PASAMOS FUNCIONES-RUTAS EXPORTADAS DONDE SE MANEJARAN LAS PETICIONES
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);

// NUESTRO SERVIDOR FUNCIONARA EN EL PUERTO INDICADO
app.listen('4000', () => {
  console.log('Backend in port 4000');
});
