import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import UserCard from '../components/UserCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

export default function UserList() {
  const { users, loading, error } = useContext(AppContext);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="users-container">
      <h2 style={{ marginBottom: '20px', fontSize: '1.4rem', fontWeight: '700' }}>
        👥 Conecte-se com outros Desenvolvedores
      </h2>
      <div className="users-grid">
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}