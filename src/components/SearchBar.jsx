// Auxilia na indicação visual se há filtros ativos no feed
export default function SearchBar({ count, query }) {
  if (!query) return null;
  return (
    <div className="search-status">
      <p>🔍 Encontrados <strong>{count}</strong> resultados para a busca: "{query}"</p>
    </div>
  );
}