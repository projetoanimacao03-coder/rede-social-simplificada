import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import CommentSection from './CommentSection';

export default function PostCard({ post }) {
  const { toggleLike, users } = useContext(AppContext);
  const author = users.find(u => u.id === post.userId) || { name: 'Usuário Anônimo' };

  return (
    <div className="card post-card">
      <div className="post-header">
        <div className="avatar">{author.name[0]}</div>
        <div>
          <Link to={`/perfil/${post.userId}`} className="post-author">{author.name}</Link>
          <p className="post-username">@{author.username || 'anonimo'}</p>
        </div>
      </div>
      
      <div className="post-content">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>

      <div className="post-actions">
        <button 
          onClick={() => toggleLike(post.id)} 
          className={`btn-like ${post.likedByUser ? 'active' : ''}`}
        >
          {post.likedByUser ? '❤️' : '🤍'} {post.likes} Curtidas
        </button>
      </div>

      <CommentSection post={post} />
    </div>
  );
}