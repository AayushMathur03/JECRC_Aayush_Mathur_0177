import { Link } from "react-router-dom";
import { colors, T } from "../../theme";

const products = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: "$89.99", rating: "⭐⭐⭐⭐⭐" },
  { id: 2, name: "Ergonomic Chair", category: "Furniture", price: "$329.00", rating: "⭐⭐⭐⭐" },
  { id: 3, name: "Running Shoes", category: "Sports", price: "$119.50", rating: "⭐⭐⭐⭐⭐" },
  { id: 4, name: "Coffee Maker", category: "Kitchen", price: "$74.99", rating: "⭐⭐⭐⭐" },
];

function ProductList() {
  return (
    <div style={T.pageWrap}>
      <h2 style={T.h2}>Products</h2>
      <p style={T.subtitle}>Browse our full catalogue of premium products.</p>

      <div style={s.grid}>
        {products.map((p) => (
          <Link to={`/products/${p.id}`} key={p.id} style={s.cardLink}>
            <div style={{ ...T.card, ...s.card }}>
              <div style={s.cardTop}>
                <span style={s.category}>{p.category}</span>
                <span style={s.rating}>{p.rating}</span>
              </div>
              <h3 style={s.productName}>{p.name}</h3>
              <div style={s.cardBottom}>
                <span style={s.price}>{p.price}</span>
                <span style={s.viewBtn}>View →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const s = {
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" },
  cardLink: { textDecoration: "none" },
  card: { display: "flex", flexDirection: "column", gap: "12px", transition: "transform 0.15s, box-shadow 0.15s" },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  category: {
    fontSize: "11px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    backgroundColor: colors.accent + "15",
    color: colors.accent,
    padding: "3px 8px",
    borderRadius: "20px",
  },
  rating: { fontSize: "12px" },
  productName: { fontSize: "16px", fontWeight: "700", color: colors.lightText },
  cardBottom: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px" },
  price: { fontSize: "18px", fontWeight: "800", color: colors.lightText },
  viewBtn: {
    fontSize: "13px",
    color: colors.accent,
    fontWeight: "600",
  },
};

export default ProductList;