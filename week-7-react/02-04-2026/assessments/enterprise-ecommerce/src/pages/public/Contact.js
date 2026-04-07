import { colors, T } from "../../theme";

const contacts = [
  { icon: "📧", label: "Email", value: "support@mystore.com" },
  { icon: "📞", label: "Phone", value: "+1 800 123 4567" },
  { icon: "🏢", label: "Address", value: "123 Commerce St, New York, NY 10001" },
  { icon: "🕐", label: "Hours", value: "Mon–Fri, 9 AM – 6 PM IST" },
];

function Contact() {
  return (
    <div style={T.pageWrap}>
      <h2 style={T.h2}>Contact Us</h2>
      <p style={T.subtitle}>Have a question or need help? We'd love to hear from you.</p>

      <div style={s.grid}>
        {/* Contact Info */}
        <div style={s.infoCol}>
          {contacts.map((c) => (
            <div key={c.label} style={{ ...T.card, display: "flex", gap: "16px", alignItems: "center" }}>
              <span style={s.icon}>{c.icon}</span>
              <div>
                <p style={s.label}>{c.label}</p>
                <p style={s.value}>{c.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Message Form */}
        <div style={T.card}>
          <h3 style={s.formTitle}>Send a Message</h3>
          <form onSubmit={(e) => e.preventDefault()} style={s.form}>
            <div>
              <label style={T.label}>Your Name</label>
              <input type="text" placeholder="John Doe" style={T.input} />
            </div>
            <div>
              <label style={T.label}>Email</label>
              <input type="email" placeholder="john@example.com" style={T.input} />
            </div>
            <div>
              <label style={T.label}>Message</label>
              <textarea
                rows={4}
                placeholder="How can we help?"
                style={{ ...T.input, resize: "vertical" }}
              />
            </div>
            <button type="submit" style={T.btnAccent}>Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

const s = {
  grid: { display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "24px", alignItems: "start" },
  infoCol: { display: "flex", flexDirection: "column", gap: "14px" },
  icon: { fontSize: "26px", flexShrink: 0 },
  label: { fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.8px", color: colors.lightMuted, fontWeight: "600", marginBottom: "2px" },
  value: { fontSize: "15px", fontWeight: "600", color: colors.lightText },
  formTitle: { fontSize: "17px", fontWeight: "700", color: colors.lightText, marginBottom: "20px" },
  form: { display: "flex", flexDirection: "column", gap: "16px" },
};

export default Contact;
