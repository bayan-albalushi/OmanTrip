import { useState } from "react";

import { useNavigate, useParams, Link } from "react-router-dom";

import omanIcon from "./assets/map.png";

export default function ResetPassword() {

  const navigate = useNavigate();
const API_URL = import.meta.env.VITE_API_URL;
  const { token } = useParams();

  const [password, setPassword] = useState("");

  const [msg, setMsg] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!password.trim()) {

      setMsg("Please enter a new password.");

      return;

    }

    if (password.trim().length < 6) {

      setMsg("Password must be at least 6 characters.");

      return;

    }

    setLoading(true);

    setMsg("");

    try {

      const res = await fetch(
        `${API_URL}/api/auth/reset-password/${token}`,

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json",

          },

          body: JSON.stringify({

            password: password.trim(),

          }),

        }

      );

      const data = await res.json();

      if (res.ok) {

        setMsg(data.message || "Password reset successfully.");

        setTimeout(() => {

          navigate("/login");

        }, 1500);

      } else {

        setMsg(data.error || "Reset failed.");

      }

    } catch (err) {

      console.error("RESET PASSWORD ERROR:", err);

      setMsg("Something went wrong. Please try again.");

    } finally {

      setLoading(false);

    }

  };

  return (
<div style={styles.page}>
<div style={styles.card}>
<div style={styles.left}>
<div style={styles.topRow}>
<div style={styles.brand} onClick={() => navigate("/")}>

              OmanTrip.
</div>
<button

              type="button"

              style={styles.backBtn}

              onClick={() => navigate("/login")}
>

              ← Back
</button>
</div>
<div style={styles.leftContent}>
<h1 style={styles.title}>Reset password</h1>
<p style={styles.sub}>

              Enter a new password for your account.
</p>
<form onSubmit={handleSubmit} style={styles.form}>
<input

                style={styles.input}

                type="password"

                placeholder="New password"

                value={password}

                onChange={(e) => setPassword(e.target.value)}

              />
<button

                type="submit"

                style={styles.primaryBtn}

                disabled={loading}
>

                {loading ? "Updating..." : "Reset Password"}
</button>
</form>

            {msg ? <p style={styles.msg}>{msg}</p> : null}
<p style={styles.footerText}>

              Back to{" "}
<Link to="/login" style={styles.link}>

                Login
</Link>
</p>
</div>
</div>
<div style={styles.right}>
<div style={styles.illustrationBox}>
<div style={styles.badge}>Account security</div>
<img src={omanIcon} style={styles.omanIcon} alt="Oman map" />
<h2 style={styles.rightTitle}>Secure your account</h2>
<p style={styles.rightSub}>

              Choose a strong password to keep your account safe.
</p>
</div>
</div>
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

  },

  card: {

    width: "min(1180px, 92vw)",

    minHeight: "720px",

    borderRadius: 24,

    overflow: "hidden",

    background: "#f6f2f7",

    boxShadow: "0 20px 60px rgba(0,0,0,0.35)",

    display: "grid",

    gridTemplateColumns: "1fr 1fr",

  },

  left: {

    padding: 32,

    display: "flex",

    flexDirection: "column",

    background: "#fff",

  },

  topRow: {

    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    gap: 16,

  },

  brand: {

    fontWeight: 700,

    fontSize: 28,

    color: "#2f6bff",

    cursor: "pointer",

    width: "fit-content",

  },

  backBtn: {

    border: "1px solid rgba(0,0,0,0.10)",

    background: "#fff",

    color: "#111",

    borderRadius: 999,

    padding: "10px 16px",

    cursor: "pointer",

    fontWeight: 700,

    fontSize: 14,

  },

  leftContent: {

    flex: 1,

    display: "flex",

    flexDirection: "column",

    justifyContent: "center",

    maxWidth: 420,

    margin: "0 auto",

    width: "100%",

  },

  title: {

    margin: 0,

    fontSize: 50,

    lineHeight: 1.05,

    color: "#111",

    fontWeight: 900,

  },

  sub: {

    marginTop: 14,

    marginBottom: 28,

    fontSize: 16,

    lineHeight: 1.5,

    color: "rgba(0,0,0,0.58)",

    fontWeight: 600,

  },

  form: {

    display: "grid",

    gap: 14,

  },

  input: {

    height: 56,

    borderRadius: 999,

    border: "1px solid rgba(0,0,0,0.14)",

    padding: "0 18px",

    fontSize: 15,

    outline: "none",

    background: "#fff",

    color: "#111",

  },

  primaryBtn: {

    height: 54,

    borderRadius: 999,

    border: "none",

    background: "#111",

    color: "#fff",

    fontWeight: 800,

    fontSize: 16,

    cursor: "pointer",

  },

  msg: {

    marginTop: 16,

    fontSize: 14,

    fontWeight: 700,

    color: "#2f6bff",

    lineHeight: 1.5,

  },

  footerText: {

    marginTop: 26,

    fontSize: 14,

    color: "rgba(0,0,0,0.62)",

    fontWeight: 600,

  },

  link: {

    color: "#2f6bff",

    textDecoration: "none",

    fontWeight: 800,

  },

  right: {

    padding: 32,

    background: "#f6f2f7",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

  },

  illustrationBox: {

    width: "100%",

    height: "100%",

    borderRadius: 28,

    background: "#f6f2f7",

    border: "1px solid rgba(0,0,0,0.04)",

    display: "flex",

    flexDirection: "column",

    alignItems: "center",

    justifyContent: "center",

    textAlign: "center",

    padding: 34,

  },

  badge: {

    padding: "8px 14px",

    borderRadius: 999,

    background: "#fff",

    color: "#111",

    fontWeight: 700,

    fontSize: 13,

    marginBottom: 20,

  },

  omanIcon: {

    width: 140,

    height: 140,

    objectFit: "contain",

    marginBottom: 18,

    opacity: 0.95,

  },

  rightTitle: {

    margin: 0,

    fontSize: 36,

    lineHeight: 1.15,

    color: "#111",

    fontWeight: 900,

  },

  rightSub: {

    marginTop: 12,

    maxWidth: 420,

    fontSize: 16,

    lineHeight: 1.5,

    color: "rgba(0,0,0,0.58)",

    fontWeight: 600,

  },

};
 