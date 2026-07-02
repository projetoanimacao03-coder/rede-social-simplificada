import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import UserCard from '../components/UserCard';
import SearchBar from '../components/SearchBar';

export default function UserList() {
  const { users, searchQuery } = useContext(AppContext);

  // Filtro inteligente para buscar usuários por nome ou username
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="users-page">
      <h2>👥 Conheça os Desenvolvedores da Rede</h2>
      
      {/* Reutiliza o componente de feedback de busca */}
      <SearchBar count={filteredUsers.length} query={searchQuery} />
      
      <div className="users-grid">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => <UserCard key={user.id} user={user} />)
        ) : (
          <p className="no-results">Nenhum desenvolvedor corresponde à sua busca.</p>
        )}
      </div>
    </div>
  );
}