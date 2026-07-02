import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function CreatePost() {
  const { addPost } = useContext(AppContext);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return alert("Preencha todos os campos!");
    
    addPost({ title, body });
    navigate('/'); // Redireciona de volta ao Feed principal
  };

  return (
    <div className="form-container card">
      <h2>✍️ O que você está pensando hoje?</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título da sua publicação</label>
          <input 
            type="text" 
            placeholder="Digite um título chamativo..." 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Conteúdo</label>
          <textarea 
            rows="5" 
            placeholder="Compartilhe suas ideias com a comunidade..." 
            value={body} 
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn-primary large">Publicar no Feed</button>
      </form>
    </div>
  );
}