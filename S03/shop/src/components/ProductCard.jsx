import { memo } from "react";

const ProductCard = memo(function ProductCard({
  product,
  qty,
  onAdd,
  onRemove,
}) {
  console.log("render", product.id); // ← проверка шага 3

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
});

export default ProductCard;