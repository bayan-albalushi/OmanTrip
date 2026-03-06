import { useEffect, useMemo, useState } from "react";

import { useNavigate, NavLink } from "react-router-dom";

import { explorePlaces, exploreCategories } from "./data/exploreData";

import "./Explore.css";

import HowItWorksModal from "./HowItWorksModal";

import { useAppSettings } from "./AppSettingsContext";

const ALL_KEY = "__all__";

export default function Explore() {

  const navigate = useNavigate();

  const { theme, language, toggleTheme, toggleLanguage } = useAppSettings();

  const [query, setQuery] = useState("");

  const [activeCat, setActiveCat] = useState(ALL_KEY);

  const [featured, setFeatured] = useState("default");

  const [openFeatured, setOpenFeatured] = useState(false);

  const [openHow, setOpenHow] = useState(false);

  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  const [justSavedPlace, setJustSavedPlace] = useState(null);

  const [msgType, setMsgType] = useState("saved"); // "saved" | "auth"

  const currentUser = useMemo(() => {

    try {

      return JSON.parse(localStorage.getItem("user") || "null");

    } catch {

      return null;

    }

  }, []);

  const token = localStorage.getItem("token");

  const isGuest = !token || !currentUser;

  const welcomeName = isGuest ? "Guest" : currentUser.name;

  const getPlacesStorageKey = () => {

    if (!token || !currentUser?.id) return null;

    return `savedPlaces_${currentUser.id}`;

  };

  const [savedIds, setSavedIds] = useState(() => {

    try {

      const rawUser = localStorage.getItem("user");

      const parsedUser = rawUser ? JSON.parse(rawUser) : null;

      const savedToken = localStorage.getItem("token");

      if (!savedToken || !parsedUser?.id) return new Set();

      const storageKey = `savedPlaces_${parsedUser.id}`;

      const raw = localStorage.getItem(storageKey);

      const arr = raw ? JSON.parse(raw) : [];

      const ids = arr.map((x) => x?.id || x?.title);

      return new Set(ids.filter(Boolean));

    } catch {

      return new Set();

    }

  });

  const t = {

    en: {

      explore: "Explore",

      buildTrip: "Build trip",

      saved: "Saved",

      howItWorks: "How it works?",

      exit: "Exit",

      dark: "Dark",

      light: "Light",

      title: "Explore Oman",

      subtitle: "Save places to plan your trip later.",

      welcome: "Welcome",

      search: "Search Muscat, Nizwa, Wadi Shab....",

      featured: "Featured",

      highest: "Highest Rated",

      summer: "Best for Summer",

      winter: "Best for Winter",

      short: "Short Trips",

      a2z: "A → Z",

      resultsNotFound: "Results not found",

      tryAnother: "Try another keyword or choose a different category.",

      save: "Save",

      savedBtn: "Saved",

      viewDetails: "View Details",

      savedTitle: "Saved ✅",

      savedText: "saved successfully.",

      savedHint: "Your place has been added successfully.",

      close: "Close",

      all: "All",

      detailsLater: "Details page later ✅",

      authTitle: "Login required",

      authText: "Please log in or create an account to save places.",

      authHint:

        "Guests can explore, but saving is only available for registered users.",

      login: "Login",

      createAccount: "Create account",

      categories: {

        Regions: "Regions",

        Mountains: "Mountains",

        Desert: "Desert",

        "Family-friendly": "Family-friendly",

        Night: "Night",

        Beaches: "Beaches",

        "Day trips": "Day trips",

      },

    },

    ar: {

      explore: "استكشاف",

      buildTrip: "بناء الرحلة",

      saved: "المحفوظات",

      howItWorks: "كيف يعمل؟",

      exit: "خروج",

      dark: "داكن",

      light: "فاتح",

      title: "استكشف عُمان",

      subtitle: "احفظ الأماكن للتخطيط لرحلتك لاحقًا.",

      welcome: "مرحبًا",

      search: "ابحث عن مسقط، نزوى، وادي شاب....",

      featured: "مميز",

      highest: "الأعلى تقييمًا",

      summer: "الأفضل للصيف",

      winter: "الأفضل للشتاء",

      short: "رحلات قصيرة",

      a2z: "أ → ي",

      resultsNotFound: "لا توجد نتائج",

      tryAnother: "جرّب كلمة أخرى أو اختر فئة مختلفة.",

      save: "حفظ",

      savedBtn: "تم الحفظ",

      viewDetails: "عرض التفاصيل",

      savedTitle: "تم الحفظ ✅",

      savedText: "تم حفظه بنجاح.",

      savedHint: "تمت إضافة المكان إلى المحفوظات.",

      close: "إغلاق",

      all: "الكل",

      detailsLater: "صفحة التفاصيل لاحقًا ✅",

      authTitle: "يلزم تسجيل الدخول",

      authText: "سجلي الدخول أو أنشئي حسابًا لحفظ الأماكن.",

      authHint: "يمكن للضيف الاستكشاف فقط، أما الحفظ فهو للمستخدمين المسجلين.",

      login: "تسجيل الدخول",

      createAccount: "إنشاء حساب",

      categories: {

        Regions: "المناطق",

        Mountains: "الجبال",

        Desert: "الصحراء",

        "Family-friendly": "مناسب للعائلة",

        Night: "ليلية",

        Beaches: "الشواطئ",

        "Day trips": "رحلات يومية",

      },

    },

  }[language];

  const tagColors = {

    Regions: "#2ab36b",

    Mountains: "#2f6bff",

    Desert: "#c9a227",

    "Family-friendly": "#7c5cff",

    Night: "#111",

    Beaches: "#00a6ff",

    "Day trips": "#ff7a00",

  };

  const featuredLabel = useMemo(() => {

    const map = {

      default: t.featured,

      highest: t.highest,

      summer: t.summer,

      winter: t.winter,

      short: t.short,

      a2z: t.a2z,

    };

    return map[featured] || t.featured;

  }, [featured, t]);

  const categoryOptions = useMemo(() => {

    return [

      { value: ALL_KEY, label: t.all },

      ...exploreCategories.map((cat) => ({

        value: cat,

        label: t.categories?.[cat] || cat,

      })),

    ];

  }, [t]);

  useEffect(() => {

    const onKey = (e) => {

      if (e.key !== "Escape") return;

      setOpenFeatured(false);

      setSaveDialogOpen(false);

      setOpenHow(false);

    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);

  }, []);

  const filtered = useMemo(() => {

    const q = query.trim().toLowerCase();

    let result = explorePlaces.filter((p) => {

      const matchCat = activeCat === ALL_KEY ? true : p.category === activeCat;

      const matchQuery =

        !q ||

        p.title.toLowerCase().includes(q) ||

        p.category.toLowerCase().includes(q) ||

        p.type.toLowerCase().includes(q);

      return matchCat && matchQuery;

    });

    if (featured === "highest") {

      result = [...result].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

    } else if (featured === "a2z") {

      result = [...result].sort((a, b) => a.title.localeCompare(b.title));

    } else if (featured === "summer") {

      result = result.filter((p) =>

        (p.best || "").toLowerCase().includes("summer")

      );

    } else if (featured === "winter") {

      result = result.filter((p) =>

        (p.best || "").toLowerCase().includes("winter")

      );

    } else if (featured === "short") {

      result = result.filter((p) => {

        const d = String(p.duration || "").toLowerCase();

        return (

          d.includes("hour") &&

          (d.includes("1") || d.includes("2") || d.includes("3"))

        );

      });

    }

    return result;

  }, [query, activeCat, featured]);

  const getKey = (p) => p?.id || p?.title;

  const onSave = (p) => {

    if (isGuest) {

      setMsgType("auth");

      setJustSavedPlace(null);

      setSaveDialogOpen(true);

      return;

    }

    try {

      const storageKey = getPlacesStorageKey();

      if (!storageKey) {

        setMsgType("auth");

        setSaveDialogOpen(true);

        return;

      }

      const raw = localStorage.getItem(storageKey);

      const prev = raw ? JSON.parse(raw) : [];

      const key = getKey(p);

      if (prev.some((x) => (x?.id || x?.title) === key)) {

        setJustSavedPlace(p);

        setMsgType("saved");

        setSaveDialogOpen(true);

        return;

      }

      const toSave = {

        id: p.id,

        title: p.title,

        category: p.category,

        type: p.type,

        duration: p.duration,

        bestSeason: p.best,

        rating: p.rating,

        image: p.image,

      };

      localStorage.setItem(storageKey, JSON.stringify([toSave, ...prev]));

      setSavedIds((old) => new Set([...old, key]));

      setJustSavedPlace(p);

      setMsgType("saved");

      setSaveDialogOpen(true);

    } catch (e) {

      console.error("Save error:", e);

      alert("Couldn’t save. Check console.");

    }

  };

  return (
<div className="explorePage">
<div className="exploreCard">
<div className="topBar">
<div className="logo">OmanTrip.</div>
<div className="nav">
<NavLink

              to="/explore"

              className={({ isActive }) =>

                `navItem ${isActive ? "navActive" : ""}`

              }
>

              {t.explore}
</NavLink>
<NavLink

              to="/build-trip"

              className={({ isActive }) =>

                `navItem ${isActive ? "navActive" : ""}`

              }
>

              {t.buildTrip}
</NavLink>
<NavLink

              to="/saved"

              className={({ isActive }) =>

                `navItem ${isActive ? "navActive" : ""}`

              }
>

              {t.saved}
</NavLink>
<button

              type="button"

              className="navItem navBtn"

              onClick={() => setOpenHow(true)}
>

              {t.howItWorks}
</button>
</div>
<div className="topActions">
<button

              type="button"

              className="navItem navBtn"

              onClick={toggleLanguage}
>

              {language === "en" ? "AR" : "EN"}
</button>
<button

              type="button"

              className="navItem navBtn"

              onClick={toggleTheme}
>

              {theme === "light" ? t.dark : t.light}
</button>
<button

              type="button"

              className="navItem navBtn"

              onClick={() => navigate("/")}
>

              {t.exit}
</button>
</div>
</div>
<div className="body">
<div className="contentWrap">
<div

              style={{

                fontSize: 16,

                fontWeight: 800,

                color: "var(--primary)",

                marginBottom: 8,

              }}
>

              {t.welcome}, {welcomeName}
</div>
<h1 className="title">{t.title}</h1>
<div className="subtitle">{t.subtitle}</div>
<div className="searchRow">
<div className="searchBox">
<span className="searchIcon">🔍</span>
<input

                  value={query}

                  onChange={(e) => setQuery(e.target.value)}

                  className="searchInput"

                  placeholder={t.search}

                />
</div>
<div className="featuredWrap">
<button

                  className="filterBtn"

                  type="button"

                  onClick={() => setOpenFeatured((v) => !v)}

                  aria-expanded={openFeatured}
>
<span>{featuredLabel}</span>
<span className="filterRight">▾</span>
</button>

                {openFeatured && (
<button

                    className="featuredBackdrop"

                    type="button"

                    onClick={() => setOpenFeatured(false)}

                    aria-label="close featured menu"

                  />

                )}

                {openFeatured && (
<div className="featuredMenu">

                    {[

                      { id: "default", label: t.featured },

                      { id: "highest", label: t.highest },

                      { id: "summer", label: t.summer },

                      { id: "winter", label: t.winter },

                      { id: "short", label: t.short },

                      { id: "a2z", label: t.a2z },

                    ].map((opt) => (
<button

                        key={opt.id}

                        type="button"

                        className={`featuredItem ${

                          featured === opt.id ? "featuredItemActive" : ""

                        }`}

                        onClick={() => {

                          setFeatured(opt.id);

                          setOpenFeatured(false);

                        }}
>

                        {opt.label}
</button>

                    ))}
</div>

                )}
</div>
</div>
<div className="chips">

              {categoryOptions.map((c) => (
<button

                  key={c.value}

                  type="button"

                  onClick={() => setActiveCat(c.value)}

                  className={`chip ${activeCat === c.value ? "chipActive" : ""}`}
>

                  {c.label}
</button>

              ))}
</div>

            {filtered.length === 0 ? (
<div className="notFound">
<div className="notFoundTitle">{t.resultsNotFound}</div>
<div className="notFoundSub">{t.tryAnother}</div>
</div>

            ) : (
<div className="grid">

                {filtered.map((p) => {

                  const key = getKey(p);

                  const isSaved = savedIds.has(key);

                  return (
<div key={p.id || p.title} className="placeCard">
<div className="imgWrap">
<img src={p.image} alt={p.title} className="placeImg" />
<div

                          className="tagPill"

                          style={{

                            background: tagColors[p.category] || "#2ab36b",

                          }}
>

                          {t.categories?.[p.category] || p.category}
</div>
<div className="overlayInfo">
<span>{p.type}</span>
<span className="overlayDot">•</span>
<span>{p.duration}</span>
<span className="overlayDot">•</span>
<span style={{ opacity: 0.8 }}>{p.best}</span>
</div>
</div>
<div className="itemBody">
<div className="itemTitle">{p.title}</div>
<div className="meta">

                          {p.type} • {p.duration} •{" "}
<span style={{ opacity: 0.6 }}>{p.best}</span>
</div>
<div className="bottomRow">
<div className="rating">★ {p.rating}</div>
<div className="actions">
<button

                              className={`badgeBtn ${

                                isSaved ? "badgeBtnSaved" : ""

                              }`}

                              type="button"

                              onClick={() => onSave(p)}
>

                              {isSaved ? t.savedBtn : t.save}
</button>
<button

                              className="badgeBtn"

                              type="button"

                              onClick={() => alert(t.detailsLater)}
>

                              {t.viewDetails}
</button>
</div>
</div>
</div>
</div>

                  );

                })}
</div>

            )}
</div>
</div>

        {saveDialogOpen && (
<>
<button

              className="dialogBackdrop"

              type="button"

              onClick={() => setSaveDialogOpen(false)}

              aria-label="close dialog"

            />
<div className="dialogCard" role="dialog" aria-modal="true">
<div className="dialogTitle">

                {msgType === "auth" ? t.authTitle : t.savedTitle}
</div>
<div className="dialogSub">

                {msgType === "auth"

                  ? t.authText

                  : justSavedPlace?.title

                  ? `“${justSavedPlace.title}” ${t.savedText}`

                  : t.savedText}
<div className="dialogHint">

                  {msgType === "auth" ? t.authHint : t.savedHint}
</div>
</div>
<div className="dialogBtns">

                {msgType === "auth" ? (
<>
<button

                      className="dialogGhost"

                      type="button"

                      onClick={() => navigate("/login")}
>

                      {t.login}
</button>
<button

                      className="dialogPrimary"

                      type="button"

                      onClick={() => navigate("/register")}
>

                      {t.createAccount}
</button>
</>

                ) : (
<button

                    className="dialogPrimary"

                    type="button"

                    onClick={() => setSaveDialogOpen(false)}
>

                    {t.close}
</button>

                )}
</div>
</div>
</>

        )}
<HowItWorksModal open={openHow} onClose={() => setOpenHow(false)} />
</div>
</div>

  );

}

 