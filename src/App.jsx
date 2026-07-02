import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Importação das Páginas
import Feed from './pages/Feed';
import CreatePost from './pages/CreatePost';
import UserProfile from './pages/UserProfile';
import UserList from './pages/UserList';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <AppProvider>
      {/* O HashRouter é crucial para evitar erros de rotas 404 ao atualizar páginas no GitHub Pages */}
      <HashRouter>
        <div className="app-wrapper">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/criar-post" element={<CreatePost />} />
              <Route path="/perfil/:id" element={<UserProfile />} />
              <Route path="/usuarios" element={<UserList />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </AppProvider>
  );
}