import {
  useState,
  useMemo,
  useRef,
  useEffect,
  useReducer,
  useCallback,
} from "react";
import { products } from "./data";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";
import "./App.css";

const initialCart = { items: [] };

function cartReducer(state, action) {
  switch (action.type) {
    case "add": {
      const existing = state.items.find((it) => it.id === action.product.id);
      if (existing) {
        return {
          items: state.items.map((it) =>
            it.id === action.product.id ? { ...it, qty: it.qty + 1 } : it
          ),
        };
      }
      return { items: [...state.items, { ...action.product, qty: 1 }] };
    }
    case "remove":
      return { items: state.items.filter((it) => it.id !== action.id) };
    case "clear":
      return initialCart;
    default:
      return state;
  }
}

export default function App() {
  const [query, setQuery] = useState("");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

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

  // стабильные производные значения
  const totalCount = useMemo(
    () => cart.items.reduce((s, it) => s + it.qty, 0),
    [cart.items]
  );
  const totalPrice = useMemo(
    () => cart.items.reduce((s, it) => s + it.price * it.qty, 0),
    [cart.items]
  );
  const qtyById = useMemo(() => {
    const map = {};
    for (const it of cart.items) map[it.id] = it.qty;
    return map;
  }, [cart.items]);

  // стабильные обработчики — обязательны для memo в ProductCard
  const add = useCallback((product) => {
    dispatch({ type: "add", product });
  }, []);
  const remove = useCallback((id) => {
    dispatch({ type: "remove", id });
  }, []);
  const clear = useCallback(() => dispatch({ type: "clear" }), []);

  return (
    <div className="app">
      <Header totalCount={totalCount} totalPrice={totalPrice} onClear={clear} />

      <SearchBar
        ref={inputRef}
        query={query}
        onQueryChange={setQuery}
        onlyInStock={onlyInStock}
        onOnlyInStockChange={setOnlyInStock}
      />

      <p className="found">Найдено: {visibleProducts.length}</p>

      <ProductList
        products={visibleProducts}
        qtyById={qtyById}
        onAdd={add}
        onRemove={remove}
      />
    </div>
  );
}