import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function PopularTopics() {
  const { posts } = useContext(AppContext);

  // Ordena os posts pelos que possuem mais curtidas e pega os top 4
  const popularPosts = [...posts]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 4);

  return (
    <aside className="sidebar-card">
      <h3>🔥 Tópicos em Alta</h3>
      <ul className="popular-list">
        {popularPosts.map((post, index) => {
          // Define a rota correta: se for post seu (isLocal ou ID 0), vai para /perfil/0. Caso contrário, vai para o ID do autor.
          const isMe = post.isLocal || post.userId === 0;
          const rotaPerfil = `/perfil/${isMe ? 0 : post.userId}`;

          return (
            <li key={post.id} className="popular-item">
              {/* Adicionado o Link para tornar o título clicável e navegar até o perfil do autor do post */}
              <Link 
                to={rotaPerfil} 
                className="popular-title" 
                style={{ textDecoration: 'none', display: 'block' }}
              >
                {post.title.length > 55 ? `${post.title.substring(0, 55)}...` : post.title}
              </Link>
              <div className="popular-meta">
                <span>#{index + 1} no ranking</span>
                <strong>❤️ {post.likes} curtidas</strong>
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}