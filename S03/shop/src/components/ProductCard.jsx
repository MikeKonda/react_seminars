export default function ProductCard({ product, qty, onAdd, onRemove }) {
  return (
    <div className="card">
      <h3>{product.title}</h3>
      <p className="price">{product.price} ₽</p>
      <p className={product.inStock ? "in-stock" : "out-of-stock"}>
        {product.inStock ? "В наличии" : "Нет в наличии"}
      </p>

      {!product.inStock ? (
        <button disabled>В корзину</button>
      ) : qty > 0 ? (
        <div className="in-cart">
          {/* клик = add → qty + 1 */}
          <button
            className="qty-btn"
            onClick={() => onAdd(product)}
            title="Добавить ещё одну"
          >
            В корзине: {qty}
          </button>
          <button className="remove-btn" onClick={() => onRemove(product.id)}>
            Убрать
          </button>
        </div>
      ) : (
        <button onClick={() => onAdd(product)}>В корзину</button>
      )}
    </div>
  );
}