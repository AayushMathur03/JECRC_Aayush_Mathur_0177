// ─── Shared Design Tokens ────────────────────────────────────────────────────
// Import this in any component: import { colors, T } from '../../theme';

export const colors = {
  bg: "#0f0e17",          // deepest background
  surface: "#1a1a2e",     // cards / sidebar on dark bg
  panel: "#16213e",       // secondary panels / header
  accent: "#e94560",      // brand red
  accentHover: "#c73652", // hover state for accent
  text: "#ffffff",        // primary text on dark
  muted: "#a0a0b8",       // secondary text on dark
  lightBg: "#f0f2f8",     // page background for public/product sections
  lightCard: "#ffffff",   // card background on light
  lightBorder: "#e2e5ee", // border on light cards
  lightText: "#1a1a2e",   // headings on light bg
  lightMuted: "#6b7280",  // muted text on light bg
};

// ─── Reusable Style Blocks ────────────────────────────────────────────────────
export const T = {
  // Page wrapper (light sections)
  pageWrap: {
    padding: "36px 40px",
    fontFamily: "'Inter', sans-serif",
    color: colors.lightText,
    minHeight: "100%",
  },

  // Section headings
  h2: {
    fontSize: "26px",
    fontWeight: "700",
    color: colors.lightText,
    marginBottom: "6px",
    marginTop: 0,
  },
  h2Dark: {
    fontSize: "24px",
    fontWeight: "700",
    color: colors.text,
    marginBottom: "6px",
    marginTop: 0,
  },
  subtitle: {
    fontSize: "14px",
    color: colors.lightMuted,
    marginBottom: "28px",
    marginTop: "4px",
  },
  subtitleDark: {
    fontSize: "14px",
    color: colors.muted,
    marginBottom: "28px",
    marginTop: "4px",
  },

  // Generic white card on light bg
  card: {
    backgroundColor: colors.lightCard,
    border: `1px solid ${colors.lightBorder}`,
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  },

  // Dark card (dashboard)
  cardDark: {
    backgroundColor: colors.panel,
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    color: colors.text,
  },

  // Label above form input
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: colors.lightMuted,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "4px",
    display: "block",
  },
  labelDark: {
    fontSize: "13px",
    fontWeight: "600",
    color: colors.muted,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "4px",
    display: "block",
  },

  // Form input
  input: {
    width: "100%",
    padding: "11px 14px",
    borderRadius: "8px",
    border: `1.5px solid ${colors.lightBorder}`,
    fontSize: "14px",
    fontFamily: "'Inter', sans-serif",
    color: colors.lightText,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },

  // Primary accent button
  btnAccent: {
    padding: "12px 24px",
    backgroundColor: colors.accent,
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "'Inter', sans-serif",
    transition: "background 0.2s",
    width: "100%",
  },

  // Dark button
  btnDark: {
    padding: "12px 24px",
    backgroundColor: colors.surface,
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "'Inter', sans-serif",
    width: "100%",
  },

  // Nav tab link (product detail tabs, etc)
  tab: {
    display: "inline-block",
    padding: "8px 20px",
    borderRadius: "6px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    border: `1.5px solid ${colors.lightBorder}`,
    color: colors.lightMuted,
    marginRight: "8px",
    transition: "all 0.15s",
  },
};
