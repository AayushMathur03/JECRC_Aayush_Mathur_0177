import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { language, setLanguage, t, translations } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (lang) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navInner}>
        <div className={styles.brand}>
          <span className={styles.brandDot}></span>
          <span className={styles.brandName}>{t.navTitle}</span>
          <span className={styles.badge}>{t.badge}</span>
        </div>

        <div className={styles.dropdownWrapper} ref={dropdownRef}>
          <button
            className={styles.dropdownTrigger}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
            <span className={styles.triggerFlag}>
              {translations[language].flag}
            </span>
            <span className={styles.triggerLabel}>
              {translations[language].label}
            </span>
            <svg
              className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {isOpen && (
            <ul className={styles.dropdownMenu} role="listbox">
              {Object.entries(translations).map(([code, val]) => (
                <li
                  key={code}
                  role="option"
                  aria-selected={code === language}
                  className={`${styles.dropdownItem} ${
                    code === language ? styles.dropdownItemActive : ""
                  }`}
                  onClick={() => handleSelect(code)}
                >
                  <span className={styles.itemFlag}>{val.flag}</span>
                  <span className={styles.itemLabel}>{val.label}</span>
                  {code === language && (
                    <svg
                      className={styles.checkIcon}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
