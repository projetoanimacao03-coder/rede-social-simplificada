import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function CreatePost() {
  const { addPost } = useContext(AppContext);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const navigate = useNavigate();

  // Manipula a seleção da imagem e converte para Base64 para salvar localmente
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // URL em Base64 para o preview e salvamento
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    // Envia os dados para o contexto. Se houver imagem carregada por você, usa ela.
    // Caso contrário, o contexto aplicará uma imagem padrão do banco tech.
    addPost({ 
      title, 
      body,
      customImage: imagePreview || null 
    });

    navigate('/');
  };

  return (
    <div className="form-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="form-card">
        <h2 style={{ marginBottom: '20px', fontSize: '1.4rem', fontWeight: '700' }}>
          ✍️ Criar Nova Publicação
        </h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-muted)' }}>Título do Post</label>
            <input 
              type="text" 
              placeholder="Dê um título chamativo..." 
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-main)',
                outline: 'none',
                fontSize: '1rem'
              }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-muted)' }}>Conteúdo</label>
            <textarea 
              placeholder="O que você está programando ou estudando hoje?..." 
              rows="5"
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-main)',
                outline: 'none',
                fontSize: '1rem',
                resize: 'vertical'
              }}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>

          {/* ⭐ NOVO: Campo de Upload de Imagem */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-muted)' }}>
              📸 Adicionar Imagem ao Post (Opcional)
            </label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageChange}
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-main)',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            />
          </div>

          {/* Box de Preview da Imagem Selecionada */}
          {imagePreview && (
            <div style={{ marginTop: '10px', textAlign: 'center' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px', textAlign: 'left' }}>Pré-visualização da imagem:</p>
              <div className="post-image-container" style={{ height: '200px' }}>
                <img src={imagePreview} alt="Preview do upload" className="post-cover" />
              </div>
            </div>
          )}

          <button 
            type="submit" 
            className="btn-submit"
            style={{
              backgroundColor: 'var(--accent)',
              color: '#fff',
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'background-color 0.2s',
              marginTop: '10px'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--accent-hover)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--accent)'}
          >
            🚀 Publicar no Feed
          </button>
        </form>
      </div>
    </div>
  );
}