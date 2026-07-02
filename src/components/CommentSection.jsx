import { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function CommentSection({ post }) {
  const { addComment } = useContext(AppContext);
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addComment(post.id, text);
    setText('');
  };

  return (
    <div className="comment-section">
      <h4>Comentários ({post.comments?.length || 0})</h4>
      
      <div className="comments-list">
        {post.comments?.map(comment => (
          <div key={comment.id} className="comment-item">
            <strong>{comment.name}:</strong> <span>{comment.body}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="comment-form">
        <input 
          type="text" 
          placeholder="Escreva um comentário..." 
          value={text} 
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}