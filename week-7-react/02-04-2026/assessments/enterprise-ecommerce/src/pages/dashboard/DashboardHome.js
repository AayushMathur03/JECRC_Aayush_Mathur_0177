import { useNavigate } from "react-router-dom";
import { colors, T } from "../../theme";

const stats = [
  { label: "Total Orders", value: "1,204", icon: "🛒", change: "+12%" },
  { label: "Revenue", value: "$48,320", icon: "💰", change: "+8.4%" },
  { label: "New Customers", value: "320", icon: "👤", change: "+5.1%" },
  { label: "Avg. Order Value", value: "$40.1", icon: "📊", change: "+2.3%" },
];

export default function DashboardHome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h2 style={T.h2Dark}>Dashboard Overview</h2>
      <p style={T.subtitleDark}>Here's what's happening with your store today.</p>

      {/* Stats */}
      <div style={s.grid}>
        {stats.map((st) => (
          <div key={st.label} style={T.cardDark}>
            <div style={s.statTop}>
              <span style={s.statIcon}>{st.icon}</span>
              <span style={s.change}>{st.change}</span>
            </div>
            <h3 style={s.statValue}>{st.value}</h3>
            <p style={s.statLabel}>{st.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ ...T.cardDark, marginTop: "28px" }}>
        <h3 style={s.sectionTitle}>Quick Actions</h3>
        <div style={s.actions}>
          <button style={s.actionBtn} onClick={() => navigate("/products")}>📦 View Products</button>
          <button style={s.actionBtn} onClick={() => navigate("/analytics")}>📈 See Analytics</button>
          <button style={s.actionBtn} onClick={() => navigate("/settings")}>⚙️ Settings</button>
          <button style={{ ...s.actionBtn, backgroundColor: colors.accent + "22", color: colors.accent }} onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}

const s = {
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px", marginBottom: "8px" },
  statTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" },
  statIcon: { fontSize: "24px" },
  change: { fontSize: "12px", color: "#4ade80", fontWeight: "600", backgroundColor: "#4ade8022", padding: "3px 8px", borderRadius: "20px" },
  statValue: { fontSize: "28px", fontWeight: "800", color: colors.text, margin: "0 0 4px" },
  statLabel: { fontSize: "13px", color: colors.muted },
  sectionTitle: { fontSize: "16px", fontWeight: "700", color: colors.text, marginBottom: "16px" },
  actions: { display: "flex", gap: "12px", flexWrap: "wrap" },
  actionBtn: {
    padding: "10px 20px",
    backgroundColor: colors.surface,
    color: colors.text,
    border: `1px solid ${colors.panel}`,
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    fontFamily: "'Inter', sans-serif",
  },
};