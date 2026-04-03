import { createContext, useContext, useState, useEffect } from "react";

export const translations = {
  en: {
    label: "English",
    flag: "🇺🇸",
    heading: "Welcome to Localization Demo",
    paragraph:
      "This application demonstrates the power of React's Context API for managing language and localization settings across your entire app — instantly and seamlessly.",
    button: "Get Started",
    navTitle: "Localization Demo",
    badge: "Context API",
  },
  hi: {
    label: "हिन्दी",
    flag: "🇮🇳",
    heading: "स्थानीयकरण डेमो में आपका स्वागत है",
    paragraph:
      "यह एप्लिकेशन पूरे ऐप में भाषा और स्थानीयकरण सेटिंग्स प्रबंधित करने के लिए React के Context API की शक्ति को दर्शाता है — तुरंत और निर्बाध रूप से।",
    button: "शुरू करें",
    navTitle: "स्थानीयकरण डेमो",
    badge: "Context API",
  },
  es: {
    label: "Español",
    flag: "🇪🇸",
    heading: "Bienvenido a la Demo de Localización",
    paragraph:
      "Esta aplicación demuestra el poder del Context API de React para gestionar la configuración de idioma y localización en toda tu aplicación — de forma instantánea y fluida.",
    button: "Comenzar",
    navTitle: "Demo de Localización",
    badge: "Context API",
  },
  fr: {
    label: "Français",
    flag: "🇫🇷",
    heading: "Bienvenue dans la Démo de Localisation",
    paragraph:
      "Cette application démontre la puissance du Context API de React pour gérer les paramètres de langue et de localisation dans toute votre application — instantanément et de manière transparente.",
    button: "Commencer",
    navTitle: "Démo de Localisation",
    badge: "Context API",
  },
  de: {
    label: "Deutsch",
    flag: "🇩🇪",
    heading: "Willkommen zur Lokalisierungs-Demo",
    paragraph:
      "Diese Anwendung demonstriert die Leistungsfähigkeit von Reacts Context API zur Verwaltung von Sprach- und Lokalisierungseinstellungen in Ihrer gesamten App — sofort und nahtlos.",
    button: "Loslegen",
    navTitle: "Lokalisierungs-Demo",
    badge: "Context API",
  },
};

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("app_language") || "en";
  });

  useEffect(() => {
    localStorage.setItem("app_language", language);
  }, [language]);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export default LanguageContext;
