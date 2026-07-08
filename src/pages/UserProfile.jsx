import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function UserProfile() {
  const { id } = useParams();
  const { posts, users } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id === '0') {
      setUser({
        name: 'Você',
        username: 'usuario_logado',
        email: 'seu_email@devsocial.com',
        phone: '(11) 99999-0000',
        website: 'meuportfolio.dev',
        company: { name: 'Sua Carreira Tech' },
        address: { city: 'Cidade Local' }
      });
      setLoading(false);
      setError(null);
      return;
    }

    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!res.ok) throw new Error('Usuário não encontrado.');
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const userPosts = posts.filter(post => {
    if (id === '0') {
      return post.userId === 0 || post.isLocal;
    }
    return post.userId === Number(id) && !post.isLocal;
  });

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff&bold=true&size=200`;

  return (
    <div className="profile-container" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      <div className="form-card" style={{ borderLeft: '4px solid var(--accent)', textAlign: 'center' }}>
        <img src={avatarUrl} alt={`Avatar de ${user.name}`} className="avatar-img mega" />
        <h2 style={{ fontSize: '1.6rem', marginBottom: '4px', fontWeight: '700' }}>{user.name}</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>@{user.username.toLowerCase()}</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', fontSize: '0.95rem', textAlign: 'left', marginTop: '16px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
          <div>📧 <strong>E-mail:</strong> {user.email}</div>
          <div>📞 <strong>Telefone:</strong> {user.phone}</div>
          <div>🌐 <strong>Website:</strong> {user.website}</div>
          <div>💼 <strong>Empresa:</strong> {user.company?.name}</div>
          <div>📍 <strong>Cidade:</strong> {user.address?.city}</div>
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', fontWeight: '700' }}>
          📝 Publicações de {user.name} ({userPosts.length})
        </h3>
        
        {userPosts.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '24px', backgroundColor: 'var(--bg-card)', borderRadius: '8px', border: '1px solid var(--border)' }}>
            Nenhuma publicação feita por este perfil ainda.
          </p>
        ) : (
          <div className="posts-grid">
            {userPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}