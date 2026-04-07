import { Outlet, Link, useLocation } from "react-router-dom";
import { colors } from "../theme";

const navLinks = [
  { to: "/", label: "🏠 Home" },
  { to: "/about", label: "ℹ️ About" },
  { to: "/contact", label: "📞 Contact" },
  { to: "/products", label: "📦 Products" },
];

function MainLayout() {
  const location = useLocation();

  return (
    <div style={s.wrapper}>
      {/* ── HEADER ── */}
      <header style={s.header}>
        <span style={s.logo}>🛒 MyStore</span>
        <nav style={s.headerNav}>
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              style={{
                ...s.headerLink,
                ...(location.pathname === l.to ? s.headerLinkActive : {}),
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/login" style={s.loginBtn}>Login</Link>
        </nav>
      </header>

      {/* ── BODY ── */}
      <div style={s.body}>
        {/* SIDEBAR */}
        <aside style={s.sidebar}>
          <p style={s.sidebarSection}>Navigation</p>
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

          <p style={s.sidebarSection}>Account</p>
          <ul style={s.sidebarList}>
            <li>
              <Link to="/login" style={s.sidebarLink}>🔐 Login</Link>
            </li>
            <li>
              <Link to="/register" style={s.sidebarLink}>📝 Register</Link>
            </li>
          </ul>
        </aside>

        {/* MAIN CONTENT */}
        <main style={s.main}>
          <Outlet />
        </main>
      </div>

      {/* ── FOOTER ── */}
      <footer style={s.footer}>
        <span style={s.footerLogo}>🛒 MyStore</span>
        <span style={s.footerText}>© 2026 MyStore. All rights reserved.</span>
      </footer>
    </div>
  );
}

const s = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.panel,
    borderBottom: `1px solid ${colors.surface}`,
    padding: "0 28px",
    height: "60px",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontSize: "20px",
    fontWeight: "700",
    color: colors.accent,
    letterSpacing: "-0.3px",
  },
  headerNav: {
    display: "flex",
    gap: "4px",
    alignItems: "center",
  },
  headerLink: {
    color: colors.muted,
    fontSize: "14px",
    fontWeight: "500",
    padding: "6px 12px",
    borderRadius: "6px",
    transition: "all 0.15s",
  },
  headerLinkActive: {
    color: colors.text,
    backgroundColor: colors.surface,
  },
  loginBtn: {
    marginLeft: "8px",
    backgroundColor: colors.accent,
    color: "#fff",
    padding: "7px 16px",
    borderRadius: "7px",
    fontSize: "13px",
    fontWeight: "600",
    transition: "background 0.2s",
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
  main: {
    flex: 1,
    backgroundColor: colors.lightBg,
    overflowY: "auto",
  },
  footer: {
    backgroundColor: colors.panel,
    borderTop: `1px solid ${colors.surface}`,
    padding: "16px 28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footerLogo: {
    color: colors.accent,
    fontWeight: "700",
    fontSize: "15px",
  },
  footerText: {
    color: colors.muted,
    fontSize: "13px",
  },
};

export default MainLayout;