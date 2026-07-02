export default function ErrorMessage({ message }) {
  return (
    <div className="error-card">
      <h3>⚠️ Erro de Conexão</h3>
      <p>{message || "Não foi possível sincronizar com a API pública."}</p>
    </div>
  );
}