import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { colors, T } from "../../theme";

const productData = {
  1: { name: "Wireless Headphones", category: "Electronics", price: "$89.99", desc: "Premium over-ear headphones with 40-hour battery life and active noise cancellation." },
  2: { name: "Ergonomic Chair", category: "Furniture", price: "$329.00", desc: "Lumbar-support mesh chair designed for long work sessions." },
  3: { name: "Running Shoes", category: "Sports", price: "$119.50", desc: "Lightweight and breathable shoes built for high-performance runners." },
  4: { name: "Coffee Maker", category: "Kitchen", price: "$74.99", desc: "12-cup programmable coffee maker with built-in grinder." },
};

function ProductDetails() {
  const { productId } = useParams();
  const location = useLocation();
  const product = productData[productId] || { name: `Product ${productId}`, category: "General", price: "—", desc: "No description available." };

  const isReviews = location.pathname.endsWith("/reviews");
  const isSpecs   = location.pathname.endsWith("/specs");

  return (
    <div style={T.pageWrap}>
      {/* Back */}
      <Link to="/products" style={s.back}>← Back to Products</Link>

      {/* Product header card */}
      <div style={{ ...T.card, ...s.heroCard }}>
        <span style={s.badge}>{product.category}</span>
        <h2 style={{ ...T.h2, margin: "12px 0 8px" }}>{product.name}</h2>
        <p style={{ color: colors.lightMuted, fontSize: "15px", lineHeight: 1.6 }}>{product.desc}</p>
        <p style={s.price}>{product.price}</p>
        <button style={s.cartBtn}>🛒 Add to Cart</button>
      </div>

      {/* Nested route tabs */}
      <div style={s.tabs}>
        <Link
          to="reviews"
          style={{ ...T.tab, ...(isReviews ? s.tabActive : {}) }}
        >
          💬 Reviews
        </Link>
        <Link
          to="specs"
          style={{ ...T.tab, ...(isSpecs ? s.tabActive : {}) }}
        >
          📋 Specifications
        </Link>
      </div>

      {/* Nested route content */}
      <Outlet />
    </div>
  );
}

const s = {
  back: {
    display: "inline-block",
    fontSize: "13px",
    color: colors.lightMuted,
    fontWeight: "500",
    marginBottom: "20px",
  },
  heroCard: { marginBottom: "28px" },
  badge: {
    display: "inline-block",
    fontSize: "11px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    backgroundColor: colors.accent + "15",
    color: colors.accent,
    padding: "3px 10px",
    borderRadius: "20px",
  },
  price: {
    fontSize: "24px",
    fontWeight: "800",
    color: colors.lightText,
    margin: "16px 0 12px",
  },
  cartBtn: {
    padding: "11px 24px",
    backgroundColor: colors.accent,
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "'Inter', sans-serif",
  },
  tabs: { display: "flex", gap: "8px", marginBottom: "20px" },
  tabActive: {
    backgroundColor: colors.accent + "15",
    borderColor: colors.accent,
    color: colors.accent,
  },
};

export default ProductDetails;