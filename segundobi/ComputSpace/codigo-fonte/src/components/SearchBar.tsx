function SearchBar() {
  return (
    <div className="search-bar" aria-label="Busca visual">
      <span>⌕</span>
      <input
        type="search"
        placeholder="Buscar peças, builds, dúvidas ou recomendações..."
      />
    </div>
  )
}

export default SearchBar
