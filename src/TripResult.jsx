import { useEffect, useMemo, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import "./TripResult.css";

import { useAppSettings } from "./AppSettingsContext";

import badiyah from "./assets/explore/bidiyah-desert.jpg";

import jabal from "./assets/explore/jabal-akhdar.jpg";

import ras from "./assets/explore/ras-al-jinz.jpg";

import turtle from "./assets/explore/turtle-ras-al-jinz.jpg";

import wadiMawil from "./assets/explore/wadi-al-mawail.jpg";

import wadiShabBimmah from "./assets/explore/wadi-shab-bimmah.jpg";

export default function TripResult() {

  const navigate = useNavigate();

  const { state } = useLocation();

  const { language } = useAppSettings();

  const [loading, setLoading] = useState(true);

  const [plan, setPlan] = useState(null);

  const [error, setError] = useState("");

  const [dayImgCache, setDayImgCache] = useState({});

  const [saveMsg, setSaveMsg] = useState("");

const API_URL = `${import.meta.env.VITE_API_URL}/api/plan`;

  const currentUser = useMemo(() => {

    try {

      return JSON.parse(localStorage.getItem("user") || "null");

    } catch {

      return null;

    }

  }, []);

  const token = localStorage.getItem("token");

  const isGuest = !token || !currentUser?.id;

 const t = {
 en: {
   edit: "Edit",
   regenerate: "Regenerate",
   loading: "Generating your trip plan…",
   errorTitle: "Couldn’t generate plan",
   tryAgain: "Try again",
   yourTripPlan: "Your Trip Plan",
   anyBudget: "Any budget",
   day: "Day",
   tripSummary: "Trip summary",
   saveTrip: "Save trip",
   savedOk: "Trip saved successfully.",
   loginRequired: "Please log in or create an account to save trips.",
   requestTimeout:
     "Request timed out. Please make sure the server is running.",
   failedFetch:
     "Failed to fetch. The server may be off or unavailable. Please try again later.",
 },
 ar: {
   edit: "تعديل",
   regenerate: "إعادة التوليد",
   loading: "جارٍ إنشاء خطة رحلتك…",
   errorTitle: "تعذر إنشاء الخطة",
   tryAgain: "حاولي مرة أخرى",
   yourTripPlan: "خطة رحلتك",
   anyBudget: "أي ميزانية",
   day: "اليوم",
   tripSummary: "ملخص الرحلة",
   saveTrip: "حفظ الرحلة",
   savedOk: "تم حفظ الرحلة بنجاح.",
   loginRequired: "سجلي الدخول أو أنشئي حسابًا لحفظ الرحلات.",
   requestTimeout:
     "انتهت مهلة الطلب. تأكدي أن الخادم يعمل.",
   failedFetch:
     "فشل الاتصال. قد يكون الخادم متوقفًا أو غير متاح حاليًا. حاولي مرة أخرى لاحقًا.",
 },
}[language];

  const prefs = useMemo(() => {

    return (

      state || {

        style: "Balanced",

        budget: "",

        days: 3,

        driving: "Road trip friendly",

      }

    );

  }, [state]);

  const PLACE_IMAGES = useMemo(

    () => ({

      "wahiba sands": badiyah,

      "sharqiya sands": badiyah,

      bidiyah: badiyah,

      bidiya: badiyah,

      sand: badiyah,

      desert: badiyah,

      "jabal akhdar": jabal,

      "al jabal al akhdar": jabal,

      jebel: jabal,

      mountain: jabal,

      nizwa: jabal,

      "ras al jinz": ras,

      "ras al-jinz": ras,

      turtle: turtle,

      turtles: turtle,

      "wadi shab": wadiShabBimmah,

      bimmah: wadiShabBimmah,

      sinkhole: wadiShabBimmah,

      "hawiyat najm": wadiShabBimmah,

      "wadi mawil": wadiMawil,

      "wadi al mawail": wadiMawil,

      "al mawail": wadiMawil,

    }),

    []

  );

  const normalize = (s = "") =>

    s.toString().toLowerCase().trim().replace(/\s+/g, " ").replace(/[^\w\s'-]/g, "");

  const makeUnsplashUrl = (q = "") => {

    const query = encodeURIComponent(`${q} Oman`.trim());

    return `https://source.unsplash.com/1100x520/?${query}`;

  };

  const getLocalImageFromText = (text = "") => {

    const normalizedText = text.toLowerCase();

    for (const key of Object.keys(PLACE_IMAGES)) {

      if (normalizedText.includes(key)) return PLACE_IMAGES[key];

    }

    return null;

  };

  const buildDayQuery = (dayObj) => {

    const first = dayObj?.items?.[0] || {};

    const parts = [dayObj?.title || "", first?.place || "", first?.city || ""]

      .map((x) => x?.toString().trim())

      .filter(Boolean);

    return parts.join(" ");

  };

  const getDayImage = (dayObj) => {

    const dayKey = `day-${dayObj?.day || ""}-${normalize(dayObj?.title || "")}`;

    if (dayImgCache[dayKey]) return dayImgCache[dayKey];

    const q = buildDayQuery(dayObj);

    const local = getLocalImageFromText(q);

    if (local) {

      setDayImgCache((prev) => ({ ...prev, [dayKey]: local }));

      return local;

    }

    const url = makeUnsplashUrl(q);

    setDayImgCache((prev) => ({ ...prev, [dayKey]: url }));

    return url;

  };

  const loadPlan = async () => {

    setLoading(true);

    setError("");

    setPlan(null);

    setDayImgCache({});

    setSaveMsg("");

    const controller = new AbortController();

    const timeout = setTimeout(() => controller.abort(), 30000);

    try {

      const placesKey = currentUser?.id ? `savedPlaces_${currentUser.id}` : null;

      const raw = placesKey ? localStorage.getItem(placesKey) : null;

      const savedPlaces = raw ? JSON.parse(raw) : [];

      const res = await fetch(API_URL, {

        method: "POST",

        headers: { "Content-Type": "application/json" },

        signal: controller.signal,

        body: JSON.stringify({ ...prefs, savedPlaces }),

      });

      const text = await res.text();

      let data = null;

      try {

        data = text ? JSON.parse(text) : null;

      } catch {}

      if (!res.ok) {

        const msg =

          (data && (data.error || data.message)) ||

          text ||

          `Request failed (HTTP ${res.status})`;

        throw new Error(msg);

      }

      if (!data) throw new Error("Server returned empty response.");

      setPlan(data);

      const next = {};

      data?.days?.forEach((d) => {

        const k = `day-${d?.day || ""}-${normalize(d?.title || "")}`;

        const q = buildDayQuery(d);

        next[k] = getLocalImageFromText(q) || makeUnsplashUrl(q);

      });

      setDayImgCache(next);

    } catch (e) {

      if (e.name === "AbortError") {

        setError(t.requestTimeout);

      } else if (String(e.message).toLowerCase().includes("failed to fetch")) {

        setError(t.failedFetch);

      } else {

        setError(e.message || t.errorTitle);

      }

      console.error("TripResult loadPlan error:", e);

    } finally {

      clearTimeout(timeout);

      setLoading(false);

    }

  };

  const saveTrip = () => {

    if (isGuest) {

      setSaveMsg(t.loginRequired);

      return;

    }

    if (!plan || !currentUser?.id) return;

    const storageKey = `savedTrips_${currentUser.id}`;

    const prev = JSON.parse(localStorage.getItem(storageKey) || "[]");

    localStorage.setItem(storageKey, JSON.stringify([plan, ...prev]));

    setSaveMsg(t.savedOk);

    setTimeout(() => {

      navigate("/saved");

    }, 700);

  };

  useEffect(() => {

    loadPlan();

  }, []);

  return (
<div className="trPage">
<div className="trCard">
<div className="trTop">
<div className="trLogo">OmanTrip.</div>
<div className="trRight">
<button

              className="trGhost"

              onClick={() => navigate("/build-trip")}

              type="button"
>

              {t.edit}
</button>
<button className="trPrimary" onClick={loadPlan} type="button">

              {t.regenerate}
</button>
</div>
</div>
<div className="trBody">

          {loading && <div className="trLoading">{t.loading}</div>}

          {!loading && error && (
<div className="trError">
<div className="trErrorTitle">{t.errorTitle}</div>
<div className="trErrorSub" style={{ whiteSpace: "pre-line" }}>

                {error}
</div>
<button className="trPrimary" onClick={loadPlan} type="button">

                {t.tryAgain}
</button>
</div>

          )}

          {!loading && plan && (
<>
<h1 className="trTitle">{plan.title || t.yourTripPlan}</h1>
<div className="trSub">

                {prefs.days} {language === "ar" ? "أيام" : "days"} • {prefs.style} •{" "}

                {prefs.budget || t.anyBudget}
</div>
<div className="trGrid">
<div className="trLeft">

                  {plan.days?.map((d) => (
<div key={d.day} className="trDayCard">
<img

                        className="trDayImg"

                        src={getDayImage(d)}

                        alt={`${t.day} ${d.day}`}

                        loading="lazy"

                        onError={(e) => {

                          e.currentTarget.src = badiyah;

                        }}

                      />
<div className="trDayHead">
<div className="trDayNum">

                          {t.day} {d.day}
</div>
<div className="trDayTitle">{d.title}</div>
</div>
<div className="trItems">

                        {d.items?.map((it, idx) => (
<div key={idx} className="trItem">
<div className="trTime">{it.time}</div>
<div className="trPlace">
<div className="trPlaceName">{it.place}</div>
<div className="trMeta">

                                {it.city} • {it.why}
</div>
</div>
</div>

                        ))}
</div>
</div>

                  ))}
</div>
<div className="trRightCol">
<div className="trSummary">
<div className="trSummaryTitle">{t.tripSummary}</div>
<div className="trSummaryText">{plan.summary}</div>
<button className="trSave" type="button" onClick={saveTrip}>

                      {t.saveTrip}
</button>

                    {saveMsg ? (
<div style={{ marginTop: 10, fontWeight: 700, fontSize: 13 }}>

                        {saveMsg}
</div>

                    ) : null}
</div>
</div>
</div>
</>

          )}
</div>
</div>
</div>

  );

}
 