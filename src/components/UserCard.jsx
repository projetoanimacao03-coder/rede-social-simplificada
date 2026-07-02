import { Link } from 'react-router-dom';

export default function UserCard({ user }) {
  return (
    <div className="card user-card">
      <div className="avatar large">{user.name[0]}</div>
      <h3>{user.name}</h3>
      <p>@{user.username}</p>
      <p className="user-email">✉️ {user.email}</p>
      <Link to={`/perfil/${user.id}`} className="btn-secondary">Ver Perfil Completo</Link>
    </div>
  );
}