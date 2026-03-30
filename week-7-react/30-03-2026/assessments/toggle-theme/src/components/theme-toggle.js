import { useState, useEffect } from "react";

export default function ThemeToggle() {
  // Step 1: Boolean state
  const [isDark, setIsDark] = useState(false);

  // Step 2: Toggle function
  const toggleTheme = () => setIsDark(prev => !prev);

  // Apply theme to entire page
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Step 3: Ternary for conditional styling
  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "24px",
    },
    button: {
      padding: "12px 28px",
      fontSize: "15px",
      cursor: "pointer",
      backgroundColor: isDark ? "#f9f7f2" : "#1a1a1a",  // ← ternary
      color: isDark ? "#1a1a1a" : "#f9f7f2",             // ← ternary
      border: "none",
      borderRadius: "8px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Step 4: Display current mode */}
      <p>Mode: {isDark ? "Dark" : "Light"}</p>

      <button style={styles.button} onClick={toggleTheme}>
        {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
    </div>
  );
}