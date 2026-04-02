import { colors, T } from "../../theme";

const specs = [
  { label: "Material", value: "Premium Aluminum Alloy" },
  { label: "Weight", value: "250g" },
  { label: "Dimensions", value: "15 × 10 × 5 cm" },
  { label: "Color Options", value: "Midnight Black, Pearl White, Space Silver" },
  { label: "Warranty", value: "1 Year Manufacturer Warranty" },
  { label: "In the Box", value: "Product, User Manual, Charging Cable" },
];

export default function Specs() {
  return (
    <div>
      <h4 style={s.heading}>Product Specifications</h4>
      <div style={{ ...T.card, padding: 0, overflow: "hidden" }}>
        <table style={s.table}>
          <tbody>
            {specs.map((sp, i) => (
              <tr key={sp.label} style={{ backgroundColor: i % 2 === 0 ? "#fff" : colors.lightBg }}>
                <td style={s.key}>{sp.label}</td>
                <td style={s.val}>{sp.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const s = {
  heading: { fontSize: "17px", fontWeight: "700", color: colors.lightText, marginBottom: "16px" },
  table: { width: "100%", borderCollapse: "collapse" },
  key: {
    padding: "14px 20px",
    fontSize: "13px",
    fontWeight: "600",
    color: colors.lightMuted,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    width: "38%",
    borderBottom: `1px solid ${colors.lightBorder}`,
  },
  val: {
    padding: "14px 20px",
    fontSize: "14px",
    color: colors.lightText,
    borderBottom: `1px solid ${colors.lightBorder}`,
  },
};