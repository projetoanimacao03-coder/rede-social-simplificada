import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import CommentSection from './CommentSection';

export default function PostCard({ post }) {
  const { users, toggleLike, deletePost } = useContext(AppContext);
  const [showComments, setShowComments] = useState(false);

  const isMe = post.isLocal || post.userId === 0;

  const autor = isMe 
    ? { name: 'Você', username: 'usuario_logado' }
    : (users.find(u => u.id === Number(post.userId)) || { name: 'Desenvolvedor', username: 'dev' });

  // Gera o avatar baseado no nome do autor
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(autor.name)}&background=random&color=fff&bold=true`;

  return (
    <div className="post-card">
      <div className="post-header">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={avatarUrl} alt={`Avatar de ${autor.name}`} className="avatar-img" />
          <div className="post-author-info">
            <h4>
              <Link to={`/perfil/${isMe ? 0 : post.userId}`} style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>
                {autor.name}
              </Link>
            </h4>
            <span>@{autor.username.toLowerCase()}</span>
          </div>
        </div>

        {isMe && (
          <button 
            className="delete-btn" 
            onClick={() => deletePost(post.id)}
            title="Excluir minha publicação"
          >
            🗑️ Excluir
          </button>
        )}
      </div>

      <h3>{post.title}</h3>
      
      {/* Exibe a imagem de capa do post focada em tecnologia */}
      {post.coverImage && (
        <div className="post-image-container">
          <img src={post.coverImage} alt="Capa da publicação" className="post-cover" />
        </div>
      )}

      <p>{post.body}</p>

      <div className="post-actions">
        <button 
          className={`action-btn ${post.likedByUser ? 'liked' : ''}`} 
          onClick={() => toggleLike(post.id)}
        >
          {post.likedByUser ? '❤️' : '🤍'} {post.likes} Curtidas
        </button>

        <button 
          className="action-btn" 
          onClick={() => setShowComments(!showComments)}
        >
          💬 {post.comments.length} Comentários
        </button>
      </div>

      {showComments && <CommentSection post={post} />}
    </div>
  );
}