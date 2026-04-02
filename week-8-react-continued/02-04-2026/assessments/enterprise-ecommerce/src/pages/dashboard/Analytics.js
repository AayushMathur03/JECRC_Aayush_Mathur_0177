import { colors, T } from "../../theme";

const rows = [
  { month: "January", orders: 230, revenue: "$11,200", growth: "+4.2%" },
  { month: "February", orders: 185, revenue: "$9,800", growth: "-12.5%" },
  { month: "March", orders: 310, revenue: "$15,500", growth: "+58.2%" },
  { month: "April", orders: 479, revenue: "$23,400", growth: "+50.9%" },
];

export default function Analytics() {
  return (
    <div>
      <h2 style={T.h2Dark}>Analytics</h2>
      <p style={T.subtitleDark}>Monthly performance breakdown for your store.</p>

      {/* Summary cards */}
      <div style={s.summaryRow}>
        <div style={T.cardDark}>
          <p style={s.metaLabel}>Total Orders (YTD)</p>
          <h3 style={s.metaValue}>1,204</h3>
        </div>
        <div style={T.cardDark}>
          <p style={s.metaLabel}>Total Revenue (YTD)</p>
          <h3 style={s.metaValue}>$59,900</h3>
        </div>
        <div style={T.cardDark}>
          <p style={s.metaLabel}>Best Month</p>
          <h3 style={s.metaValue}>April</h3>
        </div>
      </div>

      {/* Table */}
      <div style={{ ...T.cardDark, marginTop: "24px", padding: 0, overflow: "hidden" }}>
        <table style={s.table}>
          <thead>
            <tr>
              {["Month", "Orders", "Revenue", "Growth"].map((h) => (
                <th key={h} style={s.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.month} style={{ backgroundColor: i % 2 === 0 ? colors.surface : colors.panel }}>
                <td style={s.td}>{r.month}</td>
                <td style={s.td}>{r.orders}</td>
                <td style={s.td}>{r.revenue}</td>
                <td style={s.td}>
                  <span style={{
                    color: r.growth.startsWith("+") ? "#4ade80" : "#f87171",
                    fontWeight: "600",
                    fontSize: "13px",
                  }}>{r.growth}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const s = {
  summaryRow: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "4px" },
  metaLabel: { fontSize: "12px", color: colors.muted, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" },
  metaValue: { fontSize: "26px", fontWeight: "800", color: colors.text, margin: 0 },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    padding: "14px 20px",
    textAlign: "left",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    color: colors.muted,
    borderBottom: `1px solid ${colors.bg}`,
  },
  td: { padding: "14px 20px", fontSize: "14px", color: colors.text },
};