import { useState } from "react";
import { colors, T } from "../../theme";

export default function Settings() {
  const [storeName, setStoreName] = useState("MyStore");
  const [email, setEmail] = useState("admin@mystore.com");
  const [currency, setCurrency] = useState("USD");
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <h2 style={T.h2Dark}>Settings</h2>
      <p style={T.subtitleDark}>Manage your store configuration and preferences.</p>

      <div style={T.cardDark}>
        <h3 style={s.sectionTitle}>Store Configuration</h3>
        <form onSubmit={handleSave} style={s.form}>
          <div>
            <label style={T.labelDark}>Store Name</label>
            <input value={storeName} onChange={(e) => setStoreName(e.target.value)} style={s.input} />
          </div>
          <div>
            <label style={T.labelDark}>Admin Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={s.input} />
          </div>
          <div>
            <label style={T.labelDark}>Currency</label>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)} style={s.input}>
              <option value="USD">USD — US Dollar</option>
              <option value="EUR">EUR — Euro</option>
              <option value="INR">INR — Indian Rupee</option>
              <option value="GBP">GBP — British Pound</option>
            </select>
          </div>

          <div style={s.actions}>
            <button type="submit" style={s.saveBtn}>Save Changes</button>
            {saved && <span style={s.success}>✅ Settings saved!</span>}
          </div>
        </form>
      </div>
    </div>
  );
}

const s = {
  sectionTitle: { fontSize: "16px", fontWeight: "700", color: colors.text, marginBottom: "24px" },
  form: { display: "flex", flexDirection: "column", gap: "20px", maxWidth: "480px" },
  input: {
    width: "100%",
    padding: "11px 14px",
    marginTop: "6px",
    borderRadius: "8px",
    border: `1.5px solid ${colors.bg}`,
    backgroundColor: colors.bg,
    color: colors.text,
    fontSize: "14px",
    fontFamily: "'Inter', sans-serif",
    outline: "none",
    boxSizing: "border-box",
  },
  actions: { display: "flex", alignItems: "center", gap: "16px", marginTop: "4px" },
  saveBtn: {
    padding: "11px 28px",
    backgroundColor: colors.accent,
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "'Inter', sans-serif",
  },
  success: { fontSize: "14px", color: "#4ade80", fontWeight: "600" },
};