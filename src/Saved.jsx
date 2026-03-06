import { useEffect, useMemo, useState } from "react";

import { useNavigate, NavLink } from "react-router-dom";

import "./Saved.css";

import { useAppSettings } from "./AppSettingsContext";

export default function Saved() {

  const navigate = useNavigate();

  const { language } = useAppSettings();

  const [tab, setTab] = useState("places");

  const [places, setPlaces] = useState([]);

  const [trips, setTrips] = useState([]);

  const [openTripIndex, setOpenTripIndex] = useState(null);

  const currentUser = useMemo(() => {

    try {

      return JSON.parse(localStorage.getItem("user") || "null");

    } catch {

      return null;

    }

  }, []);

  const token = localStorage.getItem("token");

  const isGuest = !token || !currentUser?.id;

  const PLACES_KEY = currentUser?.id ? `savedPlaces_${currentUser.id}` : null;

  const TRIPS_KEY = currentUser?.id ? `savedTrips_${currentUser.id}` : null;

  const t = {

    en: {

      explore: "Explore",

      buildTrip: "Build trip",

      saved: "Saved",

      pageTitle: "Saved",

      placesCount: "Places",

      tripsCount: "Trips",

      savedPlacesTab: "Saved places",

      savedTripsTab: "Saved trips",

      basketTitle: "Your basket",

      clearBasket: "Clear basket",

      backToExplore: "Back to explore",

      emptyPlaces: "No saved places yet. Go to Explore and add some spots ⭐",

      remove: "Remove",

      savedTripsTitle: "Saved trips",

      clearTrips: "Clear trips",

      emptyTrips: "No saved trips yet. Generate a plan and tap “Save trip”.",

      hasSummary: "Has summary",

      view: "View",

      hide: "Hide",

      delete: "Delete",

      day: "Day",

      basketSummary: "Basket summary",

      tripsSummary: "Trips summary",

      savedPlacesLabel: "Saved places",

      categories: "Categories",

      cities: "Cities",

      buildFromBasket: "Build trip from basket",

      generateNewTrip: "Generate a new trip",

      savedTripsLabel: "Saved trips",

      tip: "Tip: Save places first (Explore) → then Build trip → then Save trip.",

      best: "Best",

      days: "days",

      guestTitle: "Login required",

      guestText: "Please log in or create an account to view saved places and trips.",

      login: "Login",

      register: "Create account",

    },

    ar: {

      explore: "استكشاف",

      buildTrip: "بناء الرحلة",

      saved: "المحفوظات",

      pageTitle: "المحفوظات",

      placesCount: "الأماكن",

      tripsCount: "الرحلات",

      savedPlacesTab: "الأماكن المحفوظة",

      savedTripsTab: "الرحلات المحفوظة",

      basketTitle: "سلّتك",

      clearBasket: "تفريغ السلة",

      backToExplore: "العودة للاستكشاف",

      emptyPlaces: "لا توجد أماكن محفوظة بعد. اذهبي إلى الاستكشاف وأضيفي بعض الأماكن ⭐",

      remove: "إزالة",

      savedTripsTitle: "الرحلات المحفوظة",

      clearTrips: "حذف الرحلات",

      emptyTrips: "لا توجد رحلات محفوظة بعد. أنشئي خطة رحلة ثم اضغطي حفظ.",

      hasSummary: "يوجد ملخص",

      view: "عرض",

      hide: "إخفاء",

      delete: "حذف",

      day: "اليوم",

      basketSummary: "ملخص السلة",

      tripsSummary: "ملخص الرحلات",

      savedPlacesLabel: "الأماكن المحفوظة",

      categories: "الفئات",

      cities: "المدن",

      buildFromBasket: "ابني رحلة من السلة",

      generateNewTrip: "أنشئ رحلة جديدة",

      savedTripsLabel: "الرحلات المحفوظة",

      tip: "نصيحة: احفظي الأماكن أولًا ثم ابنِ الرحلة ثم احفظيها.",

      best: "الأفضل",

      days: "أيام",

      guestTitle: "يلزم تسجيل الدخول",

      guestText: "سجلي الدخول أو أنشئي حسابًا لعرض الأماكن والرحلات المحفوظة.",

      login: "تسجيل الدخول",

      register: "إنشاء حساب",

    },

  }[language];

  const readJSON = (key, fallback) => {

    try {

      if (!key) return fallback;

      const raw = localStorage.getItem(key);

      return raw ? JSON.parse(raw) : fallback;

    } catch {

      return fallback;

    }

  };

  const sync = () => {

    if (isGuest) {

      setPlaces([]);

      setTrips([]);

      return;

    }

    setPlaces(readJSON(PLACES_KEY, []));

    setTrips(readJSON(TRIPS_KEY, []));

  };

  useEffect(() => {

    sync();

    const onStorage = (e) => {

      if (e.key === PLACES_KEY || e.key === TRIPS_KEY) sync();

    };

    window.addEventListener("storage", onStorage);

    window.addEventListener("focus", sync);

    return () => {

      window.removeEventListener("storage", onStorage);

      window.removeEventListener("focus", sync);

    };

  }, [PLACES_KEY, TRIPS_KEY, isGuest]);

  const placesCount = places.length;

  const tripsCount = trips.length;

  const removePlace = (idx) => {

    if (!PLACES_KEY) return;

    const next = places.filter((_, i) => i !== idx);

    localStorage.setItem(PLACES_KEY, JSON.stringify(next));

    setPlaces(next);

  };

  const clearPlaces = () => {

    if (!PLACES_KEY) return;

    localStorage.setItem(PLACES_KEY, JSON.stringify([]));

    setPlaces([]);

  };

  const removeTrip = (idx) => {

    if (!TRIPS_KEY) return;

    const next = trips.filter((_, i) => i !== idx);

    localStorage.setItem(TRIPS_KEY, JSON.stringify(next));

    setTrips(next);

    if (openTripIndex === idx) setOpenTripIndex(null);

  };

  const clearTrips = () => {

    if (!TRIPS_KEY) return;

    localStorage.setItem(TRIPS_KEY, JSON.stringify([]));

    setTrips([]);

    setOpenTripIndex(null);

  };

  const getPlaceThumb = (p) => {

    return p?.image || p?.img || p?.photo || p?.thumbnail || p?.cover || "";

  };

  const basketSummary = useMemo(() => {

    const cats = new Set();

    const cities = new Set();

    places.forEach((p) => {

      if (p?.category) cats.add(p.category);

      if (p?.city) cities.add(p.city);

      if (p?.location) cities.add(p.location);

    });

    return { cats: cats.size, cities: cities.size };

  }, [places]);

  const goPlanFromBasket = () => {

    navigate("/build-trip");

  };

  return (
<div className="svPage">
<div className="svCard">
<div className="svTopBar">
<div className="svLogo">OmanTrip.</div>
<div className="svNav">
<NavLink

              to="/explore"

              className={({ isActive }) => `svNavItem ${isActive ? "svNavActive" : ""}`}
>

              {t.explore}
</NavLink>
<NavLink

              to="/build-trip"

              className={({ isActive }) => `svNavItem ${isActive ? "svNavActive" : ""}`}
>

              {t.buildTrip}
</NavLink>
<NavLink

              to="/saved"

              className={({ isActive }) => `svNavItem ${isActive ? "svNavActive" : ""}`}
>

              {t.saved}
</NavLink>
</div>
</div>
<div className="svBody">
<div className="svWrap">
<div className="svHeader">
<h1 className="svTitle">{t.pageTitle}</h1>
<div className="svSub">

                {t.placesCount}: <b>{placesCount}</b> <span className="svDot">•</span> {t.tripsCount}: <b>{tripsCount}</b>
</div>
</div>

            {isGuest ? (
<div className="svSection">
<div className="svEmpty" style={{ textAlign: "center" }}>
<div style={{ fontWeight: 900, fontSize: 18, marginBottom: 8 }}>

                    {t.guestTitle}
</div>
<div>{t.guestText}</div>
<div style={{ marginTop: 18, display: "flex", gap: 12, justifyContent: "center" }}>
<button className="svPrimary" type="button" onClick={() => navigate("/login")}>

                      {t.login}
</button>
<button className="svClear" type="button" onClick={() => navigate("/register")}>

                      {t.register}
</button>
</div>
</div>
</div>

            ) : (
<>
<div className="svTabs">
<button

                    className={`svTab ${tab === "places" ? "isActive" : ""}`}

                    onClick={() => setTab("places")}

                    type="button"
>

                    {t.savedPlacesTab}
</button>
<button

                    className={`svTab ${tab === "trips" ? "isActive" : ""}`}

                    onClick={() => setTab("trips")}

                    type="button"
>

                    {t.savedTripsTab}
</button>
</div>
<div className="svGrid">
<div className="svLeft">

                    {tab === "places" && (
<div className="svSection">
<div className="svSectionHead">
<div className="svSectionTitle">{t.basketTitle}</div>
<div className="svHeadLinks">
<button

                              className="svLink"

                              type="button"

                              onClick={clearPlaces}

                              disabled={places.length === 0}
>

                              {t.clearBasket}
</button>
<button

                              className="svLink"

                              type="button"

                              onClick={() => navigate("/explore")}
>

                              {t.backToExplore}
</button>
</div>
</div>

                        {places.length === 0 ? (
<div className="svEmpty">{t.emptyPlaces}</div>

                        ) : (
<div className="svList">

                            {places.map((p, idx) => (
<div className="svItem" key={p?.id || `${p?.title}-${idx}`}>
<div className="svThumb">

                                  {getPlaceThumb(p) ? (
<img src={getPlaceThumb(p)} alt={p?.title || "place"} />

                                  ) : (
<div className="svThumbFallback">📍</div>

                                  )}
</div>
<div className="svInfo">
<div className="svName">{p?.title || "Saved place"}</div>
<div className="svMeta">

                                    {p?.category || "—"}

                                    {p?.duration ? (
<>
<span className="svDot">•</span> {p.duration}
</>

                                    ) : null}

                                    {p?.best ? (
<>
<span className="svDot">•</span> {t.best}: {p.best}
</>

                                    ) : p?.bestSeason ? (
<>
<span className="svDot">•</span> {t.best}: {p.bestSeason}
</>

                                    ) : null}
</div>
</div>
<button

                                  className="svRemove"

                                  type="button"

                                  onClick={() => removePlace(idx)}
>

                                  {t.remove}
</button>
</div>

                            ))}
</div>

                        )}
</div>

                    )}

                    {tab === "trips" && (
<div className="svSection">
<div className="svSectionHead">
<div className="svSectionTitle">{t.savedTripsTitle}</div>
<div className="svHeadLinks">
<button

                              className="svLink"

                              type="button"

                              onClick={clearTrips}

                              disabled={trips.length === 0}
>

                              {t.clearTrips}
</button>
</div>
</div>

                        {trips.length === 0 ? (
<div className="svEmpty">{t.emptyTrips}</div>

                        ) : (
<div className="svTrips">

                            {trips.map((trip, idx) => (
<div className="svTripCard" key={`${trip?.title}-${idx}`}>
<div className="svTripHead">
<div>
<div className="svTripTitle">{trip?.title || "Trip plan"}</div>
<div className="svTripSub">

                                      {trip?.days?.length ? `${trip.days.length} ${t.days}` : "—"}{" "}
<span className="svDot">•</span>{" "}

                                      {trip?.summary ? t.hasSummary : "—"}
</div>
</div>
<div className="svTripActions">
<button

                                      className="svMini"

                                      type="button"

                                      onClick={() =>

                                        setOpenTripIndex(openTripIndex === idx ? null : idx)

                                      }
>

                                      {openTripIndex === idx ? t.hide : t.view}
</button>
<button

                                      className="svMiniDanger"

                                      type="button"

                                      onClick={() => removeTrip(idx)}
>

                                      {t.delete}
</button>
</div>
</div>

                                {openTripIndex === idx && (
<div className="svTripBody">

                                    {trip?.summary ? (
<div className="svTripSummary">{trip.summary}</div>

                                    ) : null}
<div className="svTripDays">

                                      {trip?.days?.map((d) => (
<div className="svTripDay" key={d.day}>
<div className="svTripDayTitle">

                                            {t.day} {d.day}: {d.title}
</div>
<div className="svTripItems">

                                            {d?.items?.map((it, i2) => (
<div className="svTripItem" key={i2}>
<span className="svChip">{it.time}</span>
<div className="svTripItemText">
<div className="svTripPlace">

                                                    {it.place}

                                                    {it.city ? (
<span className="svCity"> • {it.city}</span>

                                                    ) : null}
</div>
<div className="svTripWhy">{it.why}</div>
</div>
</div>

                                            ))}
</div>
</div>

                                      ))}
</div>
</div>

                                )}
</div>

                            ))}
</div>

                        )}
</div>

                    )}
</div>
<div className="svRight">
<div className="svSummary">
<div className="svSummaryTitle">

                        {tab === "places" ? t.basketSummary : t.tripsSummary}
</div>

                      {tab === "places" ? (
<div className="svSummaryList">
<div className="svSummaryItem">
<span className="svBullet">📌</span> {t.savedPlacesLabel}: <b>{placesCount}</b>
</div>
<div className="svSummaryItem">
<span className="svBullet">🏷️</span> {t.categories}: <b>{basketSummary.cats}</b>
</div>
<div className="svSummaryItem">
<span className="svBullet">🗺️</span> {t.cities}: <b>{basketSummary.cities}</b>
</div>
<button

                            className="svPrimary"

                            type="button"

                            onClick={goPlanFromBasket}

                            disabled={placesCount === 0}
>

                            {t.buildFromBasket}
</button>
<button

                            className="svClear"

                            type="button"

                            onClick={clearPlaces}

                            disabled={placesCount === 0}
>

                            {t.clearBasket}
</button>
</div>

                      ) : (
<div className="svSummaryList">
<div className="svSummaryItem">
<span className="svBullet">🧳</span> {t.savedTripsLabel}: <b>{tripsCount}</b>
</div>
<button

                            className="svPrimary"

                            type="button"

                            onClick={() => navigate("/build-trip")}
>

                            {t.generateNewTrip}
</button>
<button

                            className="svClear"

                            type="button"

                            onClick={clearTrips}

                            disabled={tripsCount === 0}
>

                            {t.clearTrips}
</button>
</div>

                      )}
</div>
<div className="svHint">
<div className="svHintIcon">🤖</div>
<div className="svHintText">{t.tip}</div>
</div>
</div>
</div>
</>

            )}
</div>
</div>
</div>
</div>

  );

}