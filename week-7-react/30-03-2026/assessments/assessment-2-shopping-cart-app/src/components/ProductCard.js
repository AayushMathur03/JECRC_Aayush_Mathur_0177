// Receives ONE product + ONE callback — knows nothing about cart
export default function ProductCard({ product, onAdd }) {
  return (
    <div style={{
      padding: "14px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      marginBottom: "10px",
    }}>
      <p style={{ fontWeight: "500" }}>{product.name}</p>
      <p style={{ color: "#666", fontSize: "14px" }}>${product.price}</p>

      {/* Calls the callback — doesn't touch state directly */}
      <button
        onClick={() => onAdd(product)}
        style={{ marginTop: "8px", padding: "6px 16px", cursor: "pointer" }}
      >
        + Add to Cart
      </button>
    </div>
  );
}