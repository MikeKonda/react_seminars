import { useReducer, useMemo, useCallback, useEffect } from "react";

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

// ленивая инициализация из localStorage
function initCart(initial) {
  try {
    const raw = localStorage.getItem("cart");
    return raw ? JSON.parse(raw) : initial;
  } catch {
    return initial;
  }
}

export function useCart() {
  const [cart, dispatch] = useReducer(cartReducer, initialCart, initCart);

  // сохраняем корзину при каждом изменении
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const add = useCallback((product) => {
    dispatch({ type: "add", product });
  }, []);
  const remove = useCallback((id) => {
    dispatch({ type: "remove", id });
  }, []);
  const clear = useCallback(() => dispatch({ type: "clear" }), []);

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

  return { totalCount, totalPrice, qtyById, add, remove, clear };
}