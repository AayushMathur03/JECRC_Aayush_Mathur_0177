import { colors, T } from "../../theme";

const reviews = [
  { user: "Alice M.", rating: 5, comment: "Absolutely love this product! Far exceeded my expectations.", date: "March 28, 2026" },
  { user: "Bob K.", rating: 4, comment: "Great quality and fast delivery. Would definitely buy again.", date: "March 15, 2026" },
  { user: "Charlie R.", rating: 3, comment: "Good product overall, but the packaging could be improved.", date: "February 20, 2026" },
];

const stars = (n) => "★".repeat(n) + "☆".repeat(5 - n);

export default function Reviews() {
  return (
    <div>
      <h4 style={s.heading}>Customer Reviews ({reviews.length})</h4>
      <div style={s.list}>
        {reviews.map((r) => (
          <div key={r.user} style={T.card}>
            <div style={s.top}>
              <div>
                <strong style={s.user}>{r.user}</strong>
                <span style={s.date}>{r.date}</span>
              </div>
              <span style={{ color: "#f59e0b", fontSize: "15px", letterSpacing: "2px" }}>
                {stars(r.rating)}
              </span>
            </div>
            <p style={s.comment}>{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const s = {
  heading: { fontSize: "17px", fontWeight: "700", color: colors.lightText, marginBottom: "16px" },
  list: { display: "flex", flexDirection: "column", gap: "14px" },
  top: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" },
  user: { fontSize: "15px", color: colors.lightText, display: "block" },
  date: { fontSize: "12px", color: colors.lightMuted, marginTop: "2px", display: "block" },
  comment: { fontSize: "14px", color: colors.lightMuted, lineHeight: 1.6, margin: 0 },
};