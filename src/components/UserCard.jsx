import { Link } from 'react-router-dom';

export default function UserCard({ user }) {
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff&bold=true`;

  return (
    <div className="user-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={avatarUrl} alt={user.name} className="avatar-img large" style={{ margin: '0 15px 0 0' }} />
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '2px' }}>
              {user.name}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              @{user.username.toLowerCase()}
            </p>
            <p style={{ color: 'var(--text-main)', fontSize: '0.9rem', marginTop: '8px' }}>
              💼 {user.company?.name || 'Tech Solutions'}
            </p>
          </div>
        </div>
        
        <Link 
          to={`/perfil/${user.id}`} 
          className="btn-submit" 
          style={{ textDecoration: 'none', width: 'auto', padding: '8px 16px', fontSize: '0.85rem', textAlign: 'center' }}
        >
          Ver Perfil
        </Link>
      </div>
    </div>
  );
}