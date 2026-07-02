import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="card not-found-card">
      <h1>🫥 404</h1>
      <h2>Página não encontrada</h2>
      <p>Essa rota não existe na nossa rede social.</p>
      <Link to="/" className="btn-primary">Voltar para a Segurança do Feed</Link>
    </div>
  );
}