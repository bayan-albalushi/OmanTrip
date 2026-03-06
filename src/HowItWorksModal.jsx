import { useMemo, useState } from "react";

import "./HowItWorksModal.css";

import { useAppSettings } from "./AppSettingsContext";

export default function HowItWorksModal({ open, onClose }) {

  const { language } = useAppSettings();

  const [active, setActive] = useState("start");

  const t = useMemo(

    () =>

      ({

        en: {

          title: "OmanTrip Assistant",

          intro:

            "Hi! I can explain how OmanTrip works in a simple way. Choose one topic below.",

          close: "Close",

          q1: "How do I start?",

          q2: "How do I save places?",

          q3: "How do I build a trip?",

          q4: "Where can I find saved trips?",

          a1: "Start from Explore. Browse places you like, then save them to your basket. After that, go to Build trip and choose your style, budget, and number of days.",

          a2: "In Explore, press Save on any place you like. It will be added to your saved places automatically.",

          a3: "Go to Build trip, choose your travel style, budget, and days, then press Generate my AI trip. OmanTrip will create a trip plan for you.",

          a4: "You can find everything in Saved. There you will see your saved places and your saved trip plans.",

        },

        ar: {

          title: "مساعد OmanTrip",

          intro:

            "هلا! أقدر أشرح لك بسرعة كيف يشتغل OmanTrip بطريقة بسيطة. اختاري الموضوع اللي تريدينه.",

          close: "إغلاق",

          q1: "كيف أبدأ؟",

          q2: "كيف أحفظ الأماكن؟",

          q3: "كيف أبني رحلة؟",

          q4: "وين ألقى الرحلات المحفوظة؟",

          a1: "ابدئي من صفحة Explore. تصفحي الأماكن اللي تعجبك ثم احفظيها في السلة. بعدين روحي لصفحة Build trip واختاري الأسلوب والميزانية وعدد الأيام.",

          a2: "في Explore، اضغطي Save على أي مكان يعجبك، وبينحفظ تلقائيًا في الأماكن المحفوظة.",

          a3: "روحي لصفحة Build trip، واختاري أسلوب السفر والميزانية وعدد الأيام، وبعدها اضغطي Generate my AI trip. OmanTrip بيجهز لك خطة رحلة.",

          a4: "بتلقين كل شيء في صفحة Saved. هناك بتشوفين الأماكن المحفوظة وخطط الرحلات اللي حفظتيها.",

        },

      })[language],

    [language]

  );

  if (!open) return null;

  const options = [

    { id: "start", q: t.q1, a: t.a1 },

    { id: "save", q: t.q2, a: t.a2 },

    { id: "build", q: t.q3, a: t.a3 },

    { id: "saved", q: t.q4, a: t.a4 },

  ];

  const current = options.find((item) => item.id === active) || options[0];

  return (
<div className="hiBackdrop" onClick={onClose} role="presentation">
<div

        className="hiModal"

        onClick={(e) => e.stopPropagation()}

        role="dialog"

        aria-modal="true"
>
<div className="hiHead">
<div>
<div className="hiEyebrow">AI guide</div>
<div className="hiTitle">{t.title}</div>
</div>
<button className="hiClose" type="button" onClick={onClose}>

            ✕
</button>
</div>
<div className="hiIntroCard">
<div className="hiAvatar">✦</div>
<div className="hiIntroText">{t.intro}</div>
</div>
<div className="hiOptionList">

          {options.map((item) => (
<button

              key={item.id}

              type="button"

              className={`hiOption ${active === item.id ? "isActive" : ""}`}

              onClick={() => setActive(item.id)}
>
<span className="hiOptionDot" />
<span>{item.q}</span>
</button>

          ))}
</div>
<div className="hiAnswerCard">
<div className="hiAnswerLabel">{current.q}</div>
<div className="hiAnswerText">{current.a}</div>
</div>
<div className="hiActions">
<button className="hiPrimary" type="button" onClick={onClose}>

            {t.close}
</button>
</div>
</div>
</div>

  );

}
 