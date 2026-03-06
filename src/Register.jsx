import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [msg, setMsg] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {

    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {

      setMsg("Please fill all fields.");

      return;

    }

    setLoading(true);

    setMsg("");

    try {

      const res = await fetch("http://localhost:3001/api/auth/register", {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

        },

        body: JSON.stringify({

          name: name.trim(),

          email: email.trim(),

          password: password.trim(),

        }),

      });

      const data = await res.json();

      if (res.ok) {

        setMsg(

          data.message ||

            "Account created successfully. Please check your email and log in."

        );

        setName("");

        setEmail("");

        setPassword("");

        setTimeout(() => {

          navigate("/login");

        }, 1500);

      } else {

        setMsg(data.error || "Registration failed");

      }

    } catch (err) {

      console.error("REGISTER ERROR:", err);

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

              onClick={() => navigate("/")}
>

              ← Back
</button>
</div>
<div style={styles.leftContent}>
<h1 style={styles.title}>Create account</h1>
<p style={styles.sub}>

              Join OmanTrip and start saving places and building your perfect

              itinerary.
</p>
<form onSubmit={handleRegister} style={styles.form}>
<input

                style={styles.input}

                type="text"

                placeholder="Full name"

                value={name}

                onChange={(e) => setName(e.target.value)}

              />
<input

                style={styles.input}

                type="email"

                placeholder="Email"

                value={email}

                onChange={(e) => setEmail(e.target.value)}

              />
<input

                style={styles.input}

                type="password"

                placeholder="Password"

                value={password}

                onChange={(e) => setPassword(e.target.value)}

              />
<button

                style={styles.primaryBtn}

                type="submit"

                disabled={loading}
>

                {loading ? "Creating..." : "Create account"}
</button>
</form>

            {msg ? <p style={styles.msg}>{msg}</p> : null}
<p style={styles.footerText}>

              Already have an account?{" "}
<Link to="/login" style={styles.link}>

                Login
</Link>
</p>
</div>
</div>
<div style={styles.right}>
<div style={styles.illustrationBox}>
<div style={styles.badge}>Start your travel journey</div>
<div style={styles.bigIcon}>📍</div>
<h2 style={styles.rightTitle}>Discover Oman beautifully</h2>
<p style={styles.rightSub}>

              Create your account to unlock a smoother travel planning

              experience.
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

    alignItems: "center",

    justifyContent: "space-between",

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

    fontWeight: 700,

    fontSize: 14,

    cursor: "pointer",

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

    fontSize: 48,

    lineHeight: 1.1,

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

    marginTop: 6,

    height: 54,

    border: "none",

    borderRadius: 999,

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

    padding: 34,

    textAlign: "center",

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

  bigIcon: {

    fontSize: 92,

    marginBottom: 18,

  },

  rightTitle: {

    margin: 0,

    fontSize: 34,

    lineHeight: 1.2,

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
 