import ProductCard from "./ProductCard";

// Receives: products array + onAddToCart callback
// Passes both DOWN to each ProductCard
export default function ProductList({ products, onAddToCart }) {
  return (
    <div style={{ flex: 1 }}>
      <h2 style={{ marginBottom: "16px" }}>Products</h2>

      {/* map() over products → one ProductCard each */}
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAdd={onAddToCart}   // ← pass callback further down
        />
      ))}
    </div>
  );
}