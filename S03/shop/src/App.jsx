import { useState, useMemo, useRef, useEffect } from "react";
import { products } from "./data";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";
import "./App.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [onlyInStock, setOnlyInStock] = useState(false);

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const visibleProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (onlyInStock && !p.inStock) return false;
      if (q && !p.title.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query, onlyInStock]);

  return (
    <div className="app">
      <Header />

      <SearchBar
        ref={inputRef}
        query={query}
        onQueryChange={setQuery}
        onlyInStock={onlyInStock}
        onOnlyInStockChange={setOnlyInStock}
      />

      <p className="found">Найдено: {visibleProducts.length}</p>

      <ProductList products={visibleProducts} />
    </div>
  );
}