const router = require('express').Router();
const User = require('../models/User');

//REGISTRO
// HACEMOS EL REGISTRO DE UN USUARIO, TOMAMOS EL USERNAME DE LA PETICION Y LO MANDAMOS
// DE MANERA ASINCRONICA A TRAVES DE LA FUNCION SAVE()
// MANEJAMOS LA PETICION CORRECTA CON EL STATUS 200 Y ERRORES CON 500
router.post('/register', async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
    });
    const user = await newUser.save();
    res.status(200).json('usuario creado');
  } catch (error) {
    res.status(500).json(error);
  }
});
//LOGIN
// VAMOS A BUSCAR UN USUARIO A LA BASE DE DATOS CON EL MISMO NOMBRE DE USUARIO QUE ESTAMOS CARGANDO
// SINO EXISTE MANDAMOS UN MENSAJE INDICANDO CREDENCIALES INCORRECTAS
//PASAMOS COMO RESPUESTA EL NOMBRE DE USUARIO
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json('credenciales erroneas');
    const { username } = user._doc;
    res.status(200).json(username);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
