export default function Header({ totalCount, totalPrice, onClear }) {
  return (
    <header className="header">
      <h1>Магазин</h1>
      <div className="cart-summary">
        <span>
          Корзина: {totalCount} шт. · {totalPrice} ₽
        </span>
        <button onClick={onClear} disabled={totalCount === 0}>
          Очистить
        </button>
      </div>
    </header>
  );
}