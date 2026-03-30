// Receives: cart array + two callbacks
export default function Cart({ cart, onUpdateQty, onRemove }) {

  // ✅ DERIVED STATE — total is calculated, not stored
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div style={{ flex: 1 }}>
      <h2 style={{ marginBottom: "16px" }}>Cart</h2>

      {cart.length === 0 && (
        <p style={{ color: "#999" }}>Your cart is empty.</p>
      )}

      {/* map() over cart items */}
      {cart.map(item => (
        <div key={item.id} style={{
          padding: "12px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          marginBottom: "8px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>{item.name}</strong>
            {/* Calls remove callback with this item's id */}
            <button onClick={() => onRemove(item.id)}>❌</button>
          </div>

          {/* Qty controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "8px" }}>
            <button onClick={() => onUpdateQty(item.id, -1)}>−</button>
            <span>{item.qty}</span>
            <button onClick={() => onUpdateQty(item.id, +1)}>+</button>
            <span style={{ marginLeft: "auto", color: "#555" }}>
              ${item.price * item.qty}
            </span>
          </div>
        </div>
      ))}

      {/* Total — derived from reduce() */}
      <div style={{ marginTop: "16px", fontSize: "18px", fontWeight: "bold" }}>
        Total: ${total}
      </div>
    </div>
  );
}