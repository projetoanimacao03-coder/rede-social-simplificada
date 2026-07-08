import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import PostCard from '../components/PostCard';
import PopularTopics from '../components/PopularTopics';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function Feed() {
  const { posts, searchQuery, loading, error } = useContext(AppContext);

  // Filtra as postagens caso o usuário utilize o campo de buscas
  const postsFiltrados = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="feed-grid">
      {/* Coluna Principal: Postagens */}
      <div className="posts-grid">
        {postsFiltrados.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px' }}>
            Nenhum resultado encontrado para sua busca.
          </p>
        ) : (
          postsFiltrados.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </div>

      {/* Coluna Lateral: Novidade de Posts mais Populares */}
      <PopularTopics />
    </div>
  );
}