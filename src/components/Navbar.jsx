import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function Navbar() {
  const { searchQuery, setSearchQuery, theme, toggleTheme } = useContext(AppContext);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">💻 DevSocial</Link>
        
        <input 
          type="text" 
          placeholder="Pesquise posts ou pessoas..." 
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="nav-controls">
          <div className="nav-links">
            <NavLink to="/" className="nav-item">Feed</NavLink>
            <NavLink to="/usuarios" className="nav-item">Devs</NavLink>
            <NavLink to="/criar-post" className="nav-item">Novo Post</NavLink>
            <NavLink to="/perfil/0" className="nav-item">Meu Perfil</NavLink>
          </div>

          <button 
            onClick={toggleTheme} 
            className="theme-toggle-btn"
            title="Alternar Tema"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  );
}