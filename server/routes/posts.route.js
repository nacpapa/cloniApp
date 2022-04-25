const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');

// // CREAR NUEVO POST
// TOMAMOS EL CUERPO DE LA PETICION Y LO PASAMOS A MONGO COMO UN
// NUEVO POST, EN CASO DE NO PODER ARROJAMOS EL STATUS 500
router.post('/', async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});
//ACTUALIZAR NOTA
// LLEGAMOS CON LA RUTA QUE CONTIENE EL PARAMETRO ID DEL POST A ACTUALIZAR,
// TOMAMOS EL POST A ACUALIZAR A TRAVES DEL ID ENVIADO DESDE LA SOLICITUD.
// SI EL NOMBRE DE USUARIO ACTUAL ES EL MISMO QUE EL ACTUALIZAR,
// SETEAMOS LOS PARAMETROS A ACTUALIZAR Y ENVIAMOS LA ACTUALIZACION.
// EN CASO CONTRARIO NO PODEMOS ACTUALIZAR UN POST DE OTRO USUARIO
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json('solo puedes actualizar tus posteos');
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
// BORRAR NOTA
// DE LA MISMA MANERA QUE EL ACTUALIZAR TOMAMOS EL ID DE LOS PARAMETROS
// Y SOLO NOS PERMITIMOS ELIMINAR UN POST SI SOMOS EL DUEÑO
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json('post has been deleted');
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json('you can delete only your post');
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
//GET NOTA
// TOMAMOS UNA NOTA A TRAVES DEL ID ENVIADO POR PARAMETRO
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL POSTS
// TOMAMOS TODOS LOS POSTS, SI MANDAMOS UNA QUERI CON
// EL NOMBRE DE USUARIO BUSCAMOS UNICAMENTE LAS NOTAS DE ESE USUARIO
router.get('/', async (req, res) => {
  const username = req.query.user;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
