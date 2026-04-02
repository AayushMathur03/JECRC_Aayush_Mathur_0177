import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { colors } from "../theme";

const navLinks = [
  { to: "/dashboard", label: "📊 Dashboard" },
  { to: "/analytics", label: "📈 Analytics" },
  { to: "/settings", label: "⚙️ Settings" },
];

function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={s.wrapper}>
      {/* ── HEADER ── */}
      <header style={s.header}>
        <span style={s.logo}>🛒 MyStore <span style={s.badge}>Admin</span></span>
        <div style={s.headerRight}>
          <Link to="/" style={s.backLink}>← Public Site</Link>
          <button onClick={handleLogout} style={s.logoutBtn}>Logout</button>
        </div>
      </header>

      <div style={s.body}>
        {/* ── SIDEBAR ── */}
        <aside style={s.sidebar}>
          <p style={s.sidebarSection}>Dashboard</p>
          <ul style={s.sidebarList}>
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  style={{
                    ...s.sidebarLink,
                    ...(location.pathname === l.to ? s.sidebarLinkActive : {}),
                  }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <p style={s.sidebarSection}>General</p>
          <ul style={s.sidebarList}>
            <li>
              <Link to="/products" style={s.sidebarLink}>📦 Products</Link>
            </li>
            <li>
              <button onClick={handleLogout} style={s.sidebarLogout}>🚪 Logout</button>
            </li>
          </ul>
        </aside>

        {/* ── CONTENT ── */}
        <main style={s.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

const s = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: colors.bg,
    fontFamily: "'Inter', sans-serif",
    color: colors.text,
  },
  header: {
    backgroundColor: colors.panel,
    borderBottom: `1px solid ${colors.surface}`,
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 28px",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontSize: "18px",
    fontWeight: "700",
    color: colors.accent,
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  badge: {
    backgroundColor: colors.accent + "33",
    color: colors.accent,
    fontSize: "11px",
    padding: "2px 8px",
    borderRadius: "20px",
    fontWeight: "600",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  backLink: {
    color: colors.muted,
    fontSize: "13px",
    fontWeight: "500",
  },
  logoutBtn: {
    backgroundColor: colors.accent,
    color: "#fff",
    border: "none",
    borderRadius: "7px",
    padding: "7px 16px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
  },
  body: {
    display: "flex",
    flex: 1,
  },
  sidebar: {
    width: "230px",
    backgroundColor: colors.surface,
    borderRight: `1px solid ${colors.panel}`,
    padding: "24px 12px",
    flexShrink: 0,
  },
  sidebarSection: {
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "1.2px",
    color: colors.muted,
    fontWeight: "600",
    padding: "0 12px",
    margin: "20px 0 8px",
  },
  sidebarList: {
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  sidebarLink: {
    display: "block",
    color: colors.muted,
    fontSize: "14px",
    fontWeight: "500",
    padding: "9px 12px",
    borderRadius: "8px",
    transition: "all 0.15s",
  },
  sidebarLinkActive: {
    backgroundColor: colors.accent + "22",
    color: colors.accent,
  },
  sidebarLogout: {
    width: "100%",
    textAlign: "left",
    background: "none",
    border: "none",
    color: colors.muted,
    fontSize: "14px",
    fontWeight: "500",
    padding: "9px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.15s",
  },
  main: {
    flex: 1,
    padding: "36px 40px",
    overflowY: "auto",
  },
};

export default DashboardLayout;