export default function ProductCard({ product }) {
  return (
    <div className="card">
      <h3>{product.title}</h3>
      <p className="price">{product.price} ₽</p>
      <p className={product.inStock ? "in-stock" : "out-of-stock"}>
        {product.inStock ? "В наличии" : "Нет в наличии"}
      </p>
      <button disabled>В корзину</button>
    </div>
  );
}