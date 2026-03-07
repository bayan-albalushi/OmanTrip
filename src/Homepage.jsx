import { useEffect, useState } from "react";

import heroImg from "./assets/homepage-hero.png";

import { useNavigate } from "react-router-dom";

function CarIcon() {

  return (
<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
<path

        d="M3 14V13C3 12.3 3.4 11.7 4 11.5L6 10.8L7.2 8C7.5 7.3 8.2 7 9 7H15C15.8 7 16.5 7.3 16.8 8L18 10.8L20 11.5C20.6 11.7 21 12.3 21 13V14"

        stroke="rgba(255,255,255,0.95)"

        strokeWidth="1.7"

        strokeLinecap="round"

        strokeLinejoin="round"

      />
<circle

        cx="6.5"

        cy="15.5"

        r="1.5"

        stroke="rgba(255,255,255,0.95)"

        strokeWidth="1.7"

      />
<circle

        cx="17.5"

        cy="15.5"

        r="1.5"

        stroke="rgba(255,255,255,0.95)"

        strokeWidth="1.7"

      />
<path

        d="M6 18C9 19 15 19 18 18"

        stroke="rgba(255,255,255,0.5)"

        strokeWidth="1.4"

        strokeLinecap="round"

      />
</svg>

  );

}

function PinIcon() {

  return (
<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
<path

        d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z"

        stroke="rgba(255,255,255,0.9)"

        strokeWidth="1.8"

        strokeLinecap="round"

        strokeLinejoin="round"

      />
<path

        d="M12 11.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"

        stroke="rgba(255,255,255,0.9)"

        strokeWidth="1.8"

      />
</svg>

  );

}

function Step({ n, title, text }) {

  return (
<div style={styles.step}>
<div style={styles.stepNum}>{n}</div>
<div>
<div style={styles.stepTitle}>{title}</div>
<div style={styles.stepText}>{text}</div>
</div>
</div>

  );

}

export default function Homepage() {

  const navigate = useNavigate();

  const [openHow, setOpenHow] = useState(false);

  const [openAuth, setOpenAuth] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {

    const onResize = () => setIsMobile(window.innerWidth <= 768);

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);

  }, []);

  const continueAsGuest = () => {

    localStorage.setItem("guest", "true");

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setOpenAuth(false);

    navigate("/explore");

  };

  const goToLogin = () => {

    localStorage.removeItem("guest");

    setOpenAuth(false);

    navigate("/login");

  };

  const goToRegister = () => {

    localStorage.removeItem("guest");

    setOpenAuth(false);

    navigate("/register");

  };

  return (
<div style={styles.page}>
<div style={styles.card}>
<img src={heroImg} alt="OmanTrip hero" style={styles.hero} />
<div style={styles.overlay} />

        {!isMobile && (
<>
<div style={{ ...styles.tag, ...styles.tag1 }}>
<CarIcon />
<span>Road trip friendly</span>
</div>
<div style={{ ...styles.tag, ...styles.tag2 }}>
<span>Perfect for family trips</span>
</div>
<div style={{ ...styles.tag, ...styles.tag3 }}>
<PinIcon />
<span>Local experiences</span>
</div>
</>

        )}
<div style={styles.topBar}>
<div style={styles.logo}>OmanTrip.</div>
<button style={styles.startBtn} onClick={() => setOpenAuth(true)}>

            Start
</button>
</div>
<div style={styles.content}>
<h1 style={styles.h1}>

            Travel Oman,
<br />

            differently.
</h1>
<p style={styles.p}>

            Mountains, deserts, beaches and culture —
<br />

            planned your way in minutes.
</p>
<button style={styles.primaryBtn} onClick={() => setOpenHow(true)}>

            How OmanTrip works
</button>
<div style={styles.caption}>No booking. Just smart planning.</div>

          {isMobile && (
<div style={styles.mobileTagsWrap}>
<div style={styles.mobileTag}>
<CarIcon />
<span>Road trip friendly</span>
</div>
<div style={styles.mobileTag}>
<span>Perfect for family trips</span>
</div>
<div style={styles.mobileTag}>
<PinIcon />
<span>Local experiences</span>
</div>
</div>

          )}
</div>

        {openHow && (
<div

            style={styles.modalBackdrop}

            onClick={() => setOpenHow(false)}

            role="presentation"
>
<div

              style={styles.modal}

              onClick={(e) => e.stopPropagation()}

              role="dialog"

              aria-modal="true"
>
<div style={styles.modalHead}>
<div style={styles.modalTitle}>How OmanTrip works</div>
<button

                  style={styles.modalClose}

                  type="button"

                  onClick={() => setOpenHow(false)}
>

                  ✕
</button>
</div>
<div style={styles.steps}>
<Step

                  n="1"

                  title="Explore"

                  text="Browse places and discover spots."

                />
<Step n="2" title="Save" text="Save places to your basket." />
<Step

                  n="3"

                  title="Build trip"

                  text="Choose style, budget, and days."

                />
<Step

                  n="4"

                  title="Generate with AI"

                  text="Get your itinerary instantly."

                />
<Step

                  n="5"

                  title="Saved"

                  text="Save trips and revisit anytime."

                />
</div>
<div style={styles.modalActions}>
<button

                  style={styles.modalPrimary}

                  type="button"

                  onClick={() => setOpenHow(false)}
>

                  Close
</button>
</div>
</div>
</div>

        )}

        {openAuth && (
<div

            style={styles.modalBackdrop}

            onClick={() => setOpenAuth(false)}

            role="presentation"
>
<div

              style={styles.authModal}

              onClick={(e) => e.stopPropagation()}

              role="dialog"

              aria-modal="true"
>
<div style={styles.modalHead}>
<div style={styles.modalTitle}>Continue to OmanTrip</div>
<button

                  style={styles.modalClose}

                  type="button"

                  onClick={() => setOpenAuth(false)}
>

                  ✕
</button>
</div>
<div style={styles.authText}>

                Choose how you want to continue.
</div>
<div style={styles.authBtns}>
<button

                  style={styles.modalPrimary}

                  type="button"

                  onClick={continueAsGuest}
>

                  Continue as Guest
</button>
<button

                  style={styles.modalGhost}

                  type="button"

                  onClick={goToLogin}
>

                  Login
</button>
<button

                  style={styles.modalGhost}

                  type="button"

                  onClick={goToRegister}
>

                  Register
</button>
</div>
</div>
</div>

        )}
<style>{`

          @keyframes floatY {

            0%, 100% { transform: translateY(0px); }

            50% { transform: translateY(-10px); }

          }

        `}</style>
</div>
</div>

  );

}

const styles = {

  page: {

    minHeight: "100vh",

    background: "#111",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    padding: 12,

    fontFamily:

      'system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial',

    overflowY: "auto",

  },

  card: {

    width: "min(1200px, 94vw)",

    minHeight: "min(720px, 96vh)",

    position: "relative",

    borderRadius: 24,

    overflow: "hidden",

    boxShadow: "0 20px 60px rgba(0,0,0,.35)",

  },

  hero: {

    position: "absolute",

    inset: 0,

    width: "100%",

    height: "100%",

    objectFit: "cover",

    objectPosition: "center",

  },

  overlay: {

    position: "absolute",

    inset: 0,

    background:

      "linear-gradient(90deg, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.56) 38%, rgba(255,255,255,0.10) 100%)",

    zIndex: 1,

  },

  topBar: {

    position: "relative",

    zIndex: 3,

    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    gap: 16,

    padding: "20px 22px",

  },

  logo: {

    fontWeight: 800,

    fontSize: "clamp(24px, 3vw, 32px)",

    color: "#2f6bff",

  },

  startBtn: {

    border: "none",

    background: "#3b73ff",

    color: "#fff",

    padding: "12px 20px",

    borderRadius: 16,

    fontWeight: 700,

    cursor: "pointer",

    fontSize: "clamp(14px, 2vw, 16px)",

    minWidth: 96,

  },

  content: {

    position: "relative",

    zIndex: 3,

    padding: "clamp(24px, 5vw, 80px) clamp(22px, 4vw, 28px)",

    maxWidth: 620,

    width: "100%",

    boxSizing: "border-box",

  },

  h1: {

    margin: 0,

    fontSize: "clamp(46px, 9vw, 92px)",

    lineHeight: 0.98,

    color: "#000",

    fontWeight: 900,

    letterSpacing: "-0.03em",

    maxWidth: 560,

  },

  p: {

    marginTop: 18,

    marginBottom: 24,

    fontSize: "clamp(15px, 2.8vw, 20px)",

    color: "rgba(0,0,0,.62)",

    lineHeight: 1.55,

    fontWeight: 600,

    maxWidth: 520,

  },

  primaryBtn: {

    width: "min(280px, 100%)",

    border: "none",

    background: "#3b73ff",

    color: "#fff",

    padding: "16px 20px",

    borderRadius: 16,

    fontWeight: 800,

    cursor: "pointer",

    fontSize: "clamp(14px, 2vw, 16px)",

    boxShadow: "0 12px 28px rgba(59,115,255,0.28)",

  },

  caption: {

    marginTop: 16,

    color: "rgba(0,0,0,.48)",

    fontWeight: 700,

    fontSize: "clamp(13px, 2vw, 15px)",

  },

  tag: {

    position: "absolute",

    zIndex: 4,

    display: "inline-flex",

    alignItems: "center",

    gap: 10,

    padding: "10px 14px",

    borderRadius: 14,

    background: "rgba(78, 78, 78, 0.68)",

    border: "1px solid rgba(255,255,255,0.10)",

    boxShadow: "0 10px 24px rgba(0,0,0,0.18)",

    backdropFilter: "blur(10px)",

    WebkitBackdropFilter: "blur(10px)",

    color: "rgba(255,255,255,0.96)",

    fontSize: 13,

    fontWeight: 700,

    whiteSpace: "nowrap",

    animation: "floatY 3.6s ease-in-out infinite",

  },

  tag1: { bottom: 190, right: 84, animationDelay: "0s" },

  tag2: { bottom: 125, right: 150, animationDelay: "0.6s" },

  tag3: { bottom: 58, right: 88, animationDelay: "1.2s" },

  mobileTagsWrap: {

    marginTop: 20,

    display: "grid",

    gap: 10,

    width: "min(320px, 100%)",

  },

  mobileTag: {

    display: "inline-flex",

    alignItems: "center",

    gap: 10,

    padding: "10px 14px",

    borderRadius: 14,

    background: "rgba(78, 78, 78, 0.78)",

    border: "1px solid rgba(255,255,255,0.10)",

    color: "rgba(255,255,255,0.96)",

    fontSize: 13,

    fontWeight: 700,

    width: "fit-content",

    maxWidth: "100%",

    boxShadow: "0 10px 24px rgba(0,0,0,0.18)",

    backdropFilter: "blur(10px)",

    WebkitBackdropFilter: "blur(10px)",

  },

  modalBackdrop: {

    position: "absolute",

    inset: 0,

    background: "rgba(0,0,0,0.42)",

    display: "grid",

    placeItems: "center",

    zIndex: 50,

    padding: 18,

  },

  modal: {

    width: "min(560px, 92vw)",

    background: "#fff",

    borderRadius: 20,

    border: "1px solid rgba(0,0,0,0.08)",

    boxShadow: "0 25px 70px rgba(0,0,0,0.25)",

    padding: 16,

  },

  authModal: {

    width: "min(440px, 92vw)",

    background: "#fff",

    borderRadius: 20,

    border: "1px solid rgba(0,0,0,0.08)",

    boxShadow: "0 25px 70px rgba(0,0,0,0.25)",

    padding: 16,

  },

  modalHead: {

    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    gap: 12,

    padding: "6px 6px 10px",

  },

  modalTitle: {

    fontWeight: 900,

    fontSize: 16,

    color: "#000",

  },

  modalClose: {

    border: "none",

    background: "transparent",

    cursor: "pointer",

    fontWeight: 900,

    fontSize: 16,

    opacity: 0.6,

  },

  steps: {

    display: "grid",

    gap: 10,

    padding: "8px 6px 12px",

  },

  step: {

    display: "grid",

    gridTemplateColumns: "28px 1fr",

    gap: 10,

    alignItems: "start",

    padding: 10,

    borderRadius: 14,

    background: "rgba(47,107,255,0.06)",

    border: "1px solid rgba(47,107,255,0.10)",

  },

  stepNum: {

    width: 24,

    height: 24,

    borderRadius: 999,

    display: "grid",

    placeItems: "center",

    fontWeight: 900,

    color: "#2f6bff",

    background: "rgba(47,107,255,0.12)",

  },

  stepTitle: {

    fontWeight: 900,

    fontSize: 14,

    color: "#111",

  },

  stepText: {

    fontWeight: 600,

    fontSize: 12,

    color: "rgba(0,0,0,0.7)",

    marginTop: 2,

  },

  modalActions: {

    display: "flex",

    justifyContent: "flex-end",

    padding: "10px 6px 6px",

  },

  authText: {

    padding: "4px 6px 14px",

    color: "rgba(0,0,0,0.65)",

    fontWeight: 700,

    fontSize: 13,

    lineHeight: 1.45,

  },

  authBtns: {

    display: "grid",

    gap: 10,

    padding: "0 6px 6px",

  },

  modalGhost: {

    border: "1px solid rgba(0,0,0,0.12)",

    background: "#fff",

    borderRadius: 12,

    padding: "12px 14px",

    fontWeight: 900,

    cursor: "pointer",

    color: "#111",

  },

  modalPrimary: {

    border: "none",

    background: "#2f6bff",

    color: "#fff",

    borderRadius: 12,

    padding: "12px 14px",

    fontWeight: 900,

    cursor: "pointer",

  },

};
 