import { useLanguage } from "../context/LanguageContext";
import styles from "./Content.module.css";

const Content = () => {
  const { t, language } = useLanguage();

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Decorative background blobs */}
        <div className={styles.blob1} aria-hidden="true"></div>
        <div className={styles.blob2} aria-hidden="true"></div>

        {/* Card */}
        <div className={styles.card} key={language}>
          <div className={styles.cardIcon} aria-hidden="true">
            🌐
          </div>

          <h1 className={styles.heading}>{t.heading}</h1>

          <p className={styles.paragraph}>{t.paragraph}</p>

          <div className={styles.actions}>
            <button className={styles.primaryBtn}>{t.button}</button>
          </div>

          <div className={styles.langPill}>
            <span className={styles.pillDot}></span>
            {t.label ?? language.toUpperCase()}
          </div>
        </div>

        {/* Feature chips */}
        <div className={styles.chips}>
          {["Context API", "React Hooks", "localStorage", "5 Languages"].map(
            (chip) => (
              <span key={chip} className={styles.chip}>
                {chip}
              </span>
            )
          )}
        </div>
      </div>
    </main>
  );
};

export default Content;
