import { useNavigate } from "react-router-dom";
import { colors, T } from "../../theme";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("token", "authenticated-user-123");
    navigate("/dashboard");
  };

  return (
    <>
      <h2 style={s.title}>Welcome back 👋</h2>
      <p style={s.subtitle}>Login to access your dashboard.</p>

      <form onSubmit={handleLogin} style={s.form}>
        <div>
          <label style={T.labelDark}>Email</label>
          <input type="email" placeholder="admin@mystore.com" required style={s.input} />
        </div>
        <div>
          <label style={T.labelDark}>Password</label>
          <input type="password" placeholder="••••••••" required style={s.input} />
        </div>
        <button type="submit" style={T.btnAccent}>Login →</button>
      </form>

      <p style={s.footerNote}>
        Don't have an account?{" "}
        <a href="/register" style={{ color: colors.accent, fontWeight: "600" }}>Register</a>
      </p>
    </>
  );
}

const s = {
  title: { fontSize: "22px", fontWeight: "700", color: colors.text, marginBottom: "6px" },
  subtitle: { fontSize: "14px", color: colors.muted, marginBottom: "28px" },
  form: { display: "flex", flexDirection: "column", gap: "18px" },
  input: {
    width: "100%",
    padding: "11px 14px",
    borderRadius: "8px",
    border: `1.5px solid ${colors.panel}`,
    backgroundColor: colors.panel,
    color: colors.text,
    fontSize: "14px",
    fontFamily: "'Inter', sans-serif",
    outline: "none",
    boxSizing: "border-box",
    marginTop: "6px",
  },
  footerNote: {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "13px",
    color: colors.muted,
  },
};

export default Login;