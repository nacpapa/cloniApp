import './post.css';
import { Link } from 'react-router-dom';

export default function Post({ post }) {
  // INDICAMOS LA CARPETA PUBLICA DONDE ESTAN GUARDADAS LAS IMAGENES
  const PF = 'http://localhost:4000/images/';
  return (
    <div className="post">
      {/* SI HAY IMAGEN LA RENDERIZAMOS */}
      {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
      <div className="postInfo">
        {/* HACEMOS UN LINK AL POST PASANDOLE EL ID COMO PARAMETRO DE URL */}
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
}
