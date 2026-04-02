import { Outlet } from "react-router-dom";
import { colors } from "../theme";

function AuthLayout() {
  return (
    <div style={s.page}>
      {/* Brand mark at top */}
      <div style={s.brand}>🛒 MyStore</div>
      <div style={s.card}>
        <Outlet />
      </div>
      <p style={s.footer}>© 2026 MyStore. All rights reserved.</p>
    </div>
  );
}

const s = {
  page: {
    minHeight: "100vh",
    backgroundColor: colors.bg,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Inter', sans-serif",
    padding: "20px",
  },
  brand: {
    fontSize: "24px",
    fontWeight: "700",
    color: colors.accent,
    marginBottom: "28px",
    letterSpacing: "-0.3px",
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: "16px",
    padding: "40px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
  },
  footer: {
    marginTop: "24px",
    color: colors.muted,
    fontSize: "12px",
  },
};

export default AuthLayout;