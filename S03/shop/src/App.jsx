import { useState, useMemo, useRef, useEffect, useTransition } from "react";
import { products } from "./data";
import { useCart } from "./hooks/useCart";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";
import "./App.css";

export default function App() {
  const [query, setQuery] = useState("");       // срочно: текст в поле
  const [filter, setFilter] = useState("");     // несрочно: список
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [isPending, startTransition] = useTransition();

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // вся корзина — из кастомного хука
  const { totalCount, totalPrice, qtyById, add, remove, clear } = useCart();

  // текст в поле — сразу, фильтр — в transition
  function handleQueryChange(value) {
    setQuery(value);
    startTransition(() => {
      setFilter(value);
    });
  }

  const visibleProducts = useMemo(() => {
    const q = filter.trim().toLowerCase();
    return products.filter((p) => {
      if (onlyInStock && !p.inStock) return false;
      if (q && !p.title.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [filter, onlyInStock]);

  return (
    <div className="app">
      <Header totalCount={totalCount} totalPrice={totalPrice} onClear={clear} />

      <SearchBar
        ref={inputRef}
        query={query}
        onQueryChange={handleQueryChange}
        onlyInStock={onlyInStock}
        onOnlyInStockChange={setOnlyInStock}
      />

      <p className="found">
        Найдено: {visibleProducts.length}
        {isPending && " — Обновляем список..."}
      </p>

      <ProductList
        products={visibleProducts}
        qtyById={qtyById}
        onAdd={add}
        onRemove={remove}
      />
    </div>
  );
}