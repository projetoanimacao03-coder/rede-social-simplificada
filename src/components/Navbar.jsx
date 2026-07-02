import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function Navbar() {
  const { searchQuery, setSearchQuery } = useContext(AppContext);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">✨ DevSocial</Link>
        
        <input 
          type="text" 
          placeholder="Buscar posts ou pessoas..." 
          className="nav-search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="nav-links">
          <Link to="/">Feed</Link>
          <Link to="/criar-post" className="btn-primary">✍️ Novo Post</Link>
          <Link to="/usuarios">Usuários</Link>
          <Link to="/perfil/1">Meu Perfil</Link>
        </div>
      </div>
    </nav>
  );
}