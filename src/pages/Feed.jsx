import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import PostCard from '../components/PostCard';
import UserCard from '../components/UserCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import SearchBar from '../components/SearchBar';

export default function Feed() {
  const { posts, users, loading, error, searchQuery } = useContext(AppContext);

  // Filtra os posts correspondentes
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filtra os usuários correspondentes ao mesmo tempo
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="feed-container">
      {/* Se houver busca ativa, exibe o contador geral */}
      <SearchBar count={filteredPosts.length + filteredUsers.length} query={searchQuery} />

      {searchQuery ? (
        // VISÃO DE BUSCA SIMULTÂNEA: Mostra pessoas e posts juntos
        <div className="search-results-layout">
          {filteredUsers.length > 0 && (
            <div className="search-users-section">
              <h3>👥 Pessoas Encontradas ({filteredUsers.length})</h3>
              <div className="users-grid">
                {filteredUsers.map(user => <UserCard key={user.id} user={user} />)}
              </div>
            </div>
          )}

          <div className="search-posts-section" style={{ marginTop: '30px' }}>
            <h3>✍️ Publicações Encontradas ({filteredPosts.length})</h3>
            <div className="posts-grid" style={{ marginTop: '15px' }}>
              {filteredPosts.length > 0 ? (
                filteredPosts.map(post => <PostCard key={post.id} post={post} />)
              ) : (
                <p className="no-results">Nenhum post encontrado com esse termo.</p>
              )}
            </div>
          </div>
          
          {filteredPosts.length === 0 && filteredUsers.length === 0 && (
            <p className="no-results" style={{ textAlign: 'center', padding: '40px' }}>
              🫙 Nenhum post ou usuário corresponde à sua busca. Try outra palavra!
            </p>
          )}
        </div>
      ) : (
        // FLUXO PADRÃO DO FEED: Exibe apenas a lista cronológica de posts
        <div className="posts-grid">
          {filteredPosts.map(post => <PostCard key={post.id} post={post} />)}
        </div>
      )}
    </div>
  );
}