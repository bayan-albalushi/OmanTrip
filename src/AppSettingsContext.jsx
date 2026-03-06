import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AppSettingsContext = createContext(null);

export function AppSettingsProvider({ children }) {

  const [theme, setTheme] = useState(() => {

    return localStorage.getItem("theme") || "light";

  });

  const [language, setLanguage] = useState(() => {

    return localStorage.getItem("language") || "en";

  });

  useEffect(() => {

    localStorage.setItem("theme", theme);

    document.documentElement.setAttribute("data-theme", theme);

  }, [theme]);

  useEffect(() => {

    localStorage.setItem("language", language);

    document.documentElement.setAttribute("lang", language);

    document.documentElement.setAttribute("dir", language === "ar" ? "rtl" : "ltr");

  }, [language]);

  const toggleTheme = () => {

    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  };

  const toggleLanguage = () => {

    setLanguage((prev) => (prev === "en" ? "ar" : "en"));

  };

  const value = useMemo(

    () => ({

      theme,

      language,

      toggleTheme,

      toggleLanguage,

      setTheme,

      setLanguage,

    }),

    [theme, language]

  );

  return (
<AppSettingsContext.Provider value={value}>

      {children}
</AppSettingsContext.Provider>

  );

}

export function useAppSettings() {

  const context = useContext(AppSettingsContext);

  if (!context) {

    throw new Error("useAppSettings must be used inside AppSettingsProvider");

  }

  return context;

}
 