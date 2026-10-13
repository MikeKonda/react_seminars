export default function Header() {
  return (
    <header className="header">
      <h1>Магазин</h1>
      <div className="cart-summary">
        <span>Корзина: 0 шт. · 0 ₽</span>
        <button disabled>Очистить</button>
      </div>
    </header>
  );
}