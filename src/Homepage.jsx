import { useState } from "react";

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

            Mountains, deserts, beaches and culture –
<br />

            planned your way in minutes.
</p>
<button style={styles.primaryBtn} onClick={() => setOpenHow(true)}>

            How OmanTrip works
</button>
<div style={styles.caption}>No booking. Just smart planning.</div>
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

            0%,100% { transform: translateY(0px); }

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

    padding: 24,

    fontFamily:

      'system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial',

    overflowY: "auto",

  },

  card: {

    width: "min(1200px, 92vw)",

    minHeight: "720px",

    position: "relative",

    borderRadius: 18,

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

  topBar: {

    position: "relative",

    zIndex: 2,

    display: "flex",

    justifyContent: "space-between",

    padding: "22px 28px",

  },

  logo: {

    fontWeight: 700,

    fontSize: 22,

    color: "#2f6bff",

  },

  startBtn: {

    border: "none",

    background: "#3b73ff",

    color: "#fff",

    padding: "10px 18px",

    borderRadius: 12,

    fontWeight: 600,

    cursor: "pointer",

  },

  content: {

    position: "relative",

    zIndex: 2,

    padding: "80px 28px",

    maxWidth: 520,

  },

  h1: {

    margin: 0,

    fontSize: 62,

    lineHeight: 1.05,

    color: "#000",

  },

  p: {

    marginTop: 18,

    marginBottom: 26,

    fontSize: 18,

    color: "rgba(0,0,0,.6)",

    lineHeight: 1.5,

  },

  primaryBtn: {

    width: 240,

    border: "none",

    background: "#3b73ff",

    color: "#fff",

    padding: "14px 18px",

    borderRadius: 14,

    fontWeight: 700,

    cursor: "pointer",

    fontSize: 15,

  },

  caption: {

    marginTop: 16,

    color: "rgba(0,0,0,.45)",

    fontWeight: 600,

  },

  tag: {

    position: "absolute",

    zIndex: 3,

    display: "inline-flex",

    alignItems: "center",

    gap: 10,

    padding: "8px 12px",

    borderRadius: 12,

    background: "rgba(90, 90, 90, 0.65)",

    border: "1px solid rgba(255,255,255,0.10)",

    boxShadow: "0 10px 24px rgba(0,0,0,0.18)",

    backdropFilter: "blur(10px)",

    WebkitBackdropFilter: "blur(10px)",

    color: "rgba(255,255,255,0.92)",

    fontSize: 12.5,

    fontWeight: 600,

    whiteSpace: "nowrap",

    animation: "floatY 3.6s ease-in-out infinite",

  },

  tag1: { top: 360, left: "58%", animationDelay: "0s" },

  tag2: { top: 425, left: "47%", animationDelay: "0.6s" },

  tag3: { top: 490, left: "53%", animationDelay: "1.2s" },

  modalBackdrop: {

    position: "absolute",

    inset: 0,

    background: "rgba(0,0,0,0.35)",

    display: "grid",

    placeItems: "center",

    zIndex: 50,

    padding: 18,

  },

  modal: {

    width: "min(560px, 92vw)",

    background: "#fff",

    borderRadius: 18,

    border: "1px solid rgba(0,0,0,0.08)",

    boxShadow: "0 25px 70px rgba(0,0,0,0.25)",

    padding: 16,

  },

  authModal: {

    width: "min(440px, 92vw)",

    background: "#fff",

    borderRadius: 18,

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

    padding: "10px 12px",

    fontWeight: 900,

    cursor: "pointer",

    color: "#111",

  },

  modalPrimary: {

    border: "none",

    background: "#2f6bff",

    color: "#fff",

    borderRadius: 12,

    padding: "10px 12px",

    fontWeight: 900,

    cursor: "pointer",

  },

};
 