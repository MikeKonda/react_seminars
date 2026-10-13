import { forwardRef } from "react";

const SearchBar = forwardRef(function SearchBar(
  { query, onQueryChange, onlyInStock, onOnlyInStockChange },
  ref
) {
  return (
    <div className="search-bar">
      <input
        ref={ref}
        type="text"
        placeholder="Поиск по названию..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
      <label className="checkbox">
        <input
          type="checkbox"
          checked={onlyInStock}
          onChange={(e) => onOnlyInStockChange(e.target.checked)}
        />
        Только в наличии
      </label>
    </div>
  );
});

export default SearchBar;