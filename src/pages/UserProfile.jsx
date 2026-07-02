import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import PostCard from '../components/PostCard';

export default function UserProfile() {
  const { id } = useParams(); // Parâmetro dinâmico de rotas [cite: 108]
  const { users, posts } = useContext(AppContext);

  // Encontra o usuário correspondente ou simula o perfil padrão logado (ID 1)
  const user = users.find(u => u.id === parseInt(id)) || {
    id: 1,
    name: "Seu Nome de Usuário",
    username: "estudante_react",
    email: "dev@faculdade.edu",
    company: { name: "Universidade Virtual" },
    address: { city: "Brasil" }
  };

  const userPosts = posts.filter(post => post.userId === user.id);

  return (
    <div className="profile-container">
      <div className="card profile-header-card">
        <div className="avatar mega">{user.name[0]}</div>
        <h2>{user.name}</h2>
        <p className="username">@{user.username}</p>
        
        <div className="profile-details">
          <p>🏢 <strong>Trabalha em:</strong> {user.company?.name || 'Dev Freelancer'}</p>
          <p>📍 <strong>Localização:</strong> {user.address?.city || 'Home Office'}</p>
          <p>✉️ <strong>Contato:</strong> {user.email}</p>
        </div>
      </div>

      <div className="profile-feed">
        <h3>Publicações de {user.name} ({userPosts.length})</h3>
        {userPosts.map(post => <PostCard key={post.id} post={post} />)}
      </div>
    </div>
  );
}