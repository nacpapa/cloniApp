import Post from '../post/Post';
import './posts.css';

export default function Posts({ posts }) {
  return (
    // TOMAMOS EL PARAMETRO POSTS QUE LE PASAMOS Y LO MAPEAMOS PARA
    // MOSTRAR TODAS LAS TARJETAS POST EN EL INICIO
    // POR CADA POST RENDERIZAMOS UNA TARJETA
    <div className="posts">
      {posts.map((p) => (
        <Post post={p} />
      ))}
    </div>
  );
}
