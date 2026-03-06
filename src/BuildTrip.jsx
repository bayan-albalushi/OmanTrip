import { useMemo, useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";

import "./BuildTrip.css";

import { useAppSettings } from "./AppSettingsContext";

export default function BuildTrip() {

  const navigate = useNavigate();

  const { theme, language, toggleTheme, toggleLanguage } = useAppSettings();

  const [style, setStyle] = useState("Balanced");

  const [budget, setBudget] = useState("");

  const [days, setDays] = useState(3);

  const [driving] = useState("Road trip friendly");

  const t = {

    en: {

      explore: "Explore",

      buildTrip: "Build trip",

      saved: "Saved",

      exit: "Exit",

      dark: "Dark",

      light: "Light",

      title: "Build Your Trip With AI",

      sub: "Tell us about your preferences so we can tailor the perfect trip plan for you",

      travelStyle: "What’s your travel style?",

      balanced: "Balanced",

      active: "Active",

      chill: "Chill",

      moderate: "Moderate",

      takeItEasy: "Take it easy",

      showMore: "Show more",

      budgetTitle: "What’s your budget?",

      low: "Low-cost",

      mid: "Mid-range",

      premium: "Premium",

      showOptions: "Show options",

      showAll: "Show all",

      daysTitle: "How many days?",

      tripSummary: "Trip summary",

      selectedPlaces: "Selected places",

      estimatedDuration: "Estimated duration",

      drivingStyle: "Driving style",

      pace: "Pace",

      generate: "Generate my AI trip",

      clear: "Clear selection",

      hint: "Based on your preferences, Travel AI will generate a personalized trip plan that optimizes your time and trip flow",

      fastPaced: "Fast-paced",

      relaxed: "Relaxed",

      balancedPace: "Balanced",

      roadTripFriendly: "Road trip friendly",

      familyFriendly: "Family-friendly",

      nature: "Nature",

      hours: "5-7 hours",

      daysWord: "days",

      durationShort: "1-2 days",

      durationMid: "2-4 days",

      durationLong: "4-7 days",

    },

    ar: {

      explore: "استكشاف",

      buildTrip: "بناء الرحلة",

      saved: "المحفوظات",

      exit: "خروج",

      dark: "داكن",

      light: "فاتح",

      title: "ابنِ رحلتك بالذكاء الاصطناعي",

      sub: "أخبرنا بتفضيلاتك حتى نصمم لك الرحلة المناسبة",

      travelStyle: "ما هو أسلوب سفرك؟",

      balanced: "متوازن",

      active: "نشِط",

      chill: "هادئ",

      moderate: "معتدل",

      takeItEasy: "بهدوء",

      showMore: "عرض المزيد",

      budgetTitle: "ما هي ميزانيتك؟",

      low: "منخفضة",

      mid: "متوسطة",

      premium: "مرتفعة",

      showOptions: "عرض الخيارات",

      showAll: "عرض الكل",

      daysTitle: "كم عدد الأيام؟",

      tripSummary: "ملخص الرحلة",

      selectedPlaces: "الأماكن المختارة",

      estimatedDuration: "المدة المتوقعة",

      drivingStyle: "أسلوب القيادة",

      pace: "الوتيرة",

      generate: "أنشئ رحلتي بالذكاء الاصطناعي",

      clear: "مسح الاختيارات",

      hint: "بناءً على تفضيلاتك، سيقوم الذكاء الاصطناعي بإنشاء خطة رحلة مخصصة تنظم وقتك ومسار رحلتك",

      fastPaced: "سريعة",

      relaxed: "مريحة",

      balancedPace: "متوازنة",

      roadTripFriendly: "مناسبة للرحلات البرية",

      familyFriendly: "مناسبة للعائلة",

      nature: "طبيعة",

      hours: "5-7 ساعات",

      daysWord: "أيام",

      durationShort: "1-2 يوم",

      durationMid: "2-4 أيام",

      durationLong: "4-7 أيام",

    },

  }[language];

  const selectedPlacesCount = useMemo(() => {

  try {

    const currentUser = JSON.parse(localStorage.getItem("user") || "null");

    const token = localStorage.getItem("token");

    if (!token || !currentUser?.id) return 0;

    const storageKey = `savedPlaces_${currentUser.id}`;

    const raw = localStorage.getItem(storageKey);

    const arr = raw ? JSON.parse(raw) : [];

    return Array.isArray(arr) ? arr.length : 0;

  } catch {

    return 0;

  }

}, []);

 

  const pace = useMemo(() => {

    if (style === "Active") return t.fastPaced;

    if (style === "Chill") return t.relaxed;

    return t.balancedPace;

  }, [style, t]);

  const estimatedDuration = useMemo(() => {

    if (days <= 2) return t.durationShort;

    if (days <= 4) return t.durationMid;

    return t.durationLong;

  }, [days, t]);

  const clearAll = () => {

    setStyle("Balanced");

    setBudget("");

    setDays(3);

  };

  const planTrip = () => {

    navigate("/trip-result", {

      state: { style, budget, days, driving },

    });

  };

  return (
<div className="btPage">
<div className="btCard">
<div className="btTopBar">
<div className="btLogo">OmanTrip.</div>
<div className="btNav">
<NavLink

              to="/explore"

              className={({ isActive }) => `btNavItem ${isActive ? "btNavActive" : ""}`}
>

              {t.explore}
</NavLink>
<NavLink

              to="/build-trip"

              className={({ isActive }) => `btNavItem ${isActive ? "btNavActive" : ""}`}
>

              {t.buildTrip}
</NavLink>
<NavLink

              to="/saved"

              className={({ isActive }) => `btNavItem ${isActive ? "btNavActive" : ""}`}
>

              {t.saved}
</NavLink>
</div>

</div>
<div className="btBody">
<div className="btWrap">
<h1 className="btTitle">{t.title}</h1>
<div className="btSub">{t.sub}</div>
<div className="btGrid">
<div className="btLeft">
<div className="btSection">
<div className="btSectionHead">
<span className="btEmoji">🏝️</span>
<span className="btSectionTitle">{t.travelStyle}</span>
</div>
<div className="btStyleRow">
<button

                      className={`btStyleCard ${style === "Balanced" ? "isActive" : ""}`}

                      onClick={() => setStyle("Balanced")}

                      type="button"
>
<div className={`btRadio ${style === "Balanced" ? "on" : ""}`} />
<div className="btStyleText">
<div className="btStyleName">{t.balanced}</div>
<div className="btStyleSmall">{t.moderate}</div>
<div className="btMetaLine">

                          {t.nature} <span className="btDot">·</span> {t.hours}
<span className="btDot">·</span> {t.familyFriendly}
</div>
</div>
<div className="btArt">🏖️</div>
</button>
<button

                      className={`btStyleCard ${style === "Active" ? "isActive" : ""}`}

                      onClick={() => setStyle("Active")}

                      type="button"
>
<div className={`btRadio ${style === "Active" ? "on" : ""}`} />
<div className="btStyleText">
<div className="btStyleName">{t.active}</div>
<div className="btStyleSmall">{t.takeItEasy}</div>
<div className="btLinkText">{t.showMore}</div>
</div>
<div className="btArt">🥾</div>
</button>
</div>
<button

                    className={`btStyleCard btStyleWide ${style === "Chill" ? "isActive" : ""}`}

                    onClick={() => setStyle("Chill")}

                    type="button"
>
<div className={`btRadio ${style === "Chill" ? "on" : ""}`} />
<div className="btStyleText">
<div className="btStyleName">{t.chill}</div>
<div className="btStyleSmall">{t.takeItEasy}</div>
<div className="btLinkText">{t.showMore}</div>
</div>
<div className="btArt">🌴</div>
</button>
</div>
<div className="btSection">
<div className="btSectionHead">
<span className="btEmoji">🪙</span>
<span className="btSectionTitle">{t.budgetTitle}</span>
</div>
<div className="btBudgetRow">
<button

                      className={`btBudgetBtn ${budget === "low" ? "isActive" : ""}`}

                      onClick={() => setBudget("low")}

                      type="button"
>

                      $ <span>{t.low}</span>
</button>
<button

                      className={`btBudgetBtn ${budget === "mid" ? "isActive" : ""}`}

                      onClick={() => setBudget("mid")}

                      type="button"
>

                      $$ <span>{t.mid}</span>
</button>
<button

                      className={`btBudgetBtn ${budget === "premium" ? "isActive" : ""}`}

                      onClick={() => setBudget("premium")}

                      type="button"
>

                      $$$ <span>{t.premium}</span>
</button>
</div>
<div className="btBudgetFooter">
<button className="btFooterLink" type="button">

                      {t.showOptions}
</button>
<button className="btFooterLink" type="button">

                      {t.showAll}
</button>
</div>
</div>
<div className="btSection">
<div className="btSectionHead">
<span className="btEmoji">🗓️</span>
<span className="btSectionTitle">{t.daysTitle}</span>
</div>
<div className="btDaysRow">
<input

                      className="btRange"

                      type="range"

                      min="1"

                      max="7"

                      value={days}

                      onChange={(e) => setDays(Number(e.target.value))}

                    />
<div className="btDaysValue">

                      {days} {t.daysWord}
</div>
</div>
</div>
</div>
<div className="btRight">
<div className="btSummary">
<div className="btSummaryTitle">{t.tripSummary}</div>
<div className="btSummaryList">
<div className="btSummaryItem">
<span className="btBullet">▢</span>
<span>{t.selectedPlaces}: {selectedPlacesCount}</span>
</div>
<div className="btSummaryItem">
<span className="btBullet">–</span>
<span>{t.estimatedDuration}: {estimatedDuration}</span>
</div>
<div className="btSummaryItem">
<span className="btBullet">–</span>
<span>{t.drivingStyle}: {t.roadTripFriendly}</span>
</div>
<div className="btSummaryItem">
<span className="btBullet">📍</span>
<span>{t.pace}: {pace}</span>
</div>
</div>
<button className="btPrimary" onClick={planTrip} type="button">

                    {t.generate}
</button>
<button className="btClear" onClick={clearAll} type="button">

                    {t.clear}
</button>
</div>
<div className="btHint">
<div className="btHintIcon">🤖</div>
<div className="btHintText">{t.hint}</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>

  );

}
 