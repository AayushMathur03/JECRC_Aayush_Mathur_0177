import { Link } from "react-router-dom";
import { colors, T } from "../../theme";

const features = [
  { icon: "📦", title: "10,000+ Products", desc: "Explore a vast catalog across every category." },
  { icon: "🚀", title: "Fast Delivery", desc: "Same-day dispatch on all orders before 2 PM." },
  { icon: "🔒", title: "Secure Payments", desc: "256-bit SSL encryption on every transaction." },
  { icon: "🎧", title: "24/7 Support", desc: "Round-the-clock help from our expert team." },
];

function Home() {
  return (
    <div style={T.pageWrap}>
      {/* Hero */}
      <div style={s.hero}>
        <h1 style={s.heroTitle}>Welcome to <span style={{ color: colors.accent }}>MyStore</span> 🛒</h1>
        <p style={s.heroSub}>
          Your one-stop enterprise e-commerce destination — premium products, seamless experience.
        </p>
        <div style={s.heroBtns}>
          <Link to="/products" style={s.btnPrimary}>Browse Products →</Link>
          <Link to="/register" style={s.btnOutline}>Create Account</Link>
        </div>
      </div>

      {/* Features grid */}
      <h2 style={{ ...T.h2, marginBottom: "20px" }}>Why Choose Us</h2>
      <div style={s.grid}>
        {features.map((f) => (
          <div key={f.title} style={T.card}>
            <div style={s.featureIcon}>{f.icon}</div>
            <h3 style={s.featureTitle}>{f.title}</h3>
            <p style={s.featureDesc}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const s = {
  hero: {
    backgroundColor: colors.lightCard,
    border: `1px solid ${colors.lightBorder}`,
    borderRadius: "16px",
    padding: "48px 40px",
    marginBottom: "40px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
  },
  heroTitle: {
    fontSize: "34px",
    fontWeight: "800",
    color: colors.lightText,
    marginBottom: "12px",
    lineHeight: 1.2,
  },
  heroSub: {
    fontSize: "16px",
    color: colors.lightMuted,
    maxWidth: "520px",
    lineHeight: 1.6,
    marginBottom: "28px",
  },
  heroBtns: { display: "flex", gap: "14px", flexWrap: "wrap" },
  btnPrimary: {
    backgroundColor: colors.accent,
    color: "#fff",
    padding: "12px 26px",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "15px",
    transition: "background 0.2s",
  },
  btnOutline: {
    border: `2px solid ${colors.accent}`,
    color: colors.accent,
    padding: "12px 26px",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "15px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  featureIcon: { fontSize: "32px", marginBottom: "12px" },
  featureTitle: { fontSize: "16px", fontWeight: "700", color: colors.lightText, marginBottom: "6px" },
  featureDesc: { fontSize: "13px", color: colors.lightMuted, lineHeight: 1.6 },
};

export default Home;
