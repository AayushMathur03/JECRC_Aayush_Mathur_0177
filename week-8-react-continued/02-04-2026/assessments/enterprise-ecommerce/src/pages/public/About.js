import { colors, T } from "../../theme";

const values = [
  { icon: "🌍", title: "Customer First", desc: "Every decision starts with our customers." },
  { icon: "🔒", title: "Security & Trust", desc: "We protect your data and your privacy." },
  { icon: "🚀", title: "Innovation", desc: "Constantly improving the shopping experience." },
  { icon: "🤝", title: "Integrity", desc: "Honest pricing, honest products, always." },
];

function About() {
  return (
    <div style={T.pageWrap}>
      <h2 style={T.h2}>About Us</h2>
      <p style={T.subtitle}>
        MyStore is an enterprise e-commerce platform serving thousands of customers worldwide.
      </p>

      {/* Mission card */}
      <div style={{ ...T.card, marginBottom: "32px" }}>
        <h3 style={s.sectionTitle}>Our Mission</h3>
        <p style={s.body}>
          Founded in 2020, MyStore was built with one goal: connect shoppers with the world's best products
          at fair prices. We partner with hundreds of verified vendors to deliver quality you can count on.
        </p>
      </div>

      {/* Values */}
      <h3 style={{ ...T.h2, fontSize: "20px", marginBottom: "16px" }}>Our Values</h3>
      <div style={s.grid}>
        {values.map((v) => (
          <div key={v.title} style={{ ...T.card, display: "flex", gap: "16px", alignItems: "flex-start" }}>
            <span style={s.icon}>{v.icon}</span>
            <div>
              <h4 style={s.valTitle}>{v.title}</h4>
              <p style={s.valDesc}>{v.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const s = {
  sectionTitle: { fontSize: "17px", fontWeight: "700", color: colors.lightText, marginBottom: "10px" },
  body: { fontSize: "15px", color: colors.lightMuted, lineHeight: 1.7 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" },
  icon: { fontSize: "28px", marginTop: "2px", flexShrink: 0 },
  valTitle: { fontSize: "15px", fontWeight: "700", color: colors.lightText, marginBottom: "4px" },
  valDesc: { fontSize: "13px", color: colors.lightMuted, lineHeight: 1.6 },
};

export default About;
