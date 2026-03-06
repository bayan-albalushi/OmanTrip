import express from "express";

import cors from "cors";

import OpenAI from "openai";

import mongoose from "mongoose";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import nodemailer from "nodemailer";

import crypto from "crypto";

import "dotenv/config";

import User from "./models/User.js";

const app = express();

/* =========================

   Config

========================= */

const PORT = process.env.PORT || 3001;

const JWT_SECRET = process.env.JWT_SECRET || "omantrip_secret_key";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/omantrip";

/* =========================

   Middleware

========================= */

app.use(
  cors({
    origin: "http://localhost:5173",

    methods: ["GET", "POST", "PUT", "OPTIONS"],

    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

/* =========================

   Helpers

========================= */

function createToken(user) {
  return jwt.sign(
    {
      id: user._id,

      name: user.name,

      email: user.email,
    },

    JWT_SECRET,

    { expiresIn: "7d" },
  );
}

function getTransporter() {
  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_PORT ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS
  ) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,

    port: Number(process.env.SMTP_PORT),

    secure: Number(process.env.SMTP_PORT) === 465,

    auth: {
      user: process.env.SMTP_USER,

      pass: process.env.SMTP_PASS,
    },
  });
}

async function sendWelcomeEmail(toEmail, name) {
  const transporter = getTransporter();

  if (!transporter) {
    console.log("SMTP config missing. Skipping welcome email.");

    return;
  }

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.SMTP_USER,

    to: toEmail,

    subject: "Welcome to OmanTrip",

    html: `
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
<h2>Welcome to OmanTrip, ${name} 👋</h2>
<p>Your account has been created successfully.</p>
<p>You can now log in and start saving places and planning your Oman trips.</p>
<p style="margin-top: 24px;">— OmanTrip</p>
</div>

    `,
  });
}

async function sendResetPasswordEmail(toEmail, resetLink) {
  const transporter = getTransporter();

  if (!transporter) {
    console.log("SMTP config missing. Skipping reset password email.");

    return;
  }

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.SMTP_USER,

    to: toEmail,

    subject: "Reset your OmanTrip password",

    html: `
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
<h2>Reset your password</h2>
<p>We received a request to reset your OmanTrip password.</p>
<p>Click the button below to continue:</p>
<a

          href="${resetLink}"

          style="

            display:inline-block;

            margin-top:12px;

            padding:12px 18px;

            background:#2f6bff;

            color:#fff;

            text-decoration:none;

            border-radius:8px;

            font-weight:700;

          "
>

          Reset password
</a>
<p style="margin-top:20px;">

          Or copy this link into your browser:
</p>
<p>${resetLink}</p>
<p style="margin-top:20px; color:#666;">

          This link expires in 30 minutes.
</p>
<p style="margin-top: 24px;">— OmanTrip</p>
</div>

    `,
  });
}

/* =========================

   Health Check

========================= */

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

/* =========================

   OpenAI Client

========================= */

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/* =========================

   Auth Routes

========================= */

// Register

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (password.trim().length < 6) {
      return res

        .status(400)

        .json({ error: "Password must be at least 6 characters." });
    }

    const cleanEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email: cleanEmail });

    if (existingUser) {
      return res.status(400).json({ error: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    const user = await User.create({
      name: name.trim(),

      email: cleanEmail,

      password: hashedPassword,
    });

    try {
      await sendWelcomeEmail(user.email, user.name);
    } catch (mailErr) {
      console.error("Welcome email error:", mailErr);
    }

    return res.json({
      message:
        "Account created successfully. Please check your email and log in.",

      user: {
        id: user._id,

        name: user.name,

        email: user.email,
      },
    });
  } catch (err) {
    console.error("API /api/auth/register error:", err);

    return res.status(500).json({ error: err?.message || "Server error" });
  }
});

// Login

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password?.trim()) {
      return res

        .status(400)

        .json({ error: "Email and password are required." });
    }

    const cleanEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password.trim(), user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    const token = createToken(user);

    return res.json({
      message: "Login successful.",

      token,

      user: {
        id: user._id,

        name: user.name,

        email: user.email,
      },
    });
  } catch (err) {
    console.error("API /api/auth/login error:", err);

    return res.status(500).json({ error: err?.message || "Server error" });
  }
});

// Forgot Password

app.post("/api/auth/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email?.trim()) {
      return res.status(400).json({ error: "Email is required." });
    }

    const cleanEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return res.status(404).json({ error: "Email not found." });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const resetTokenExpire = new Date(Date.now() + 30 * 60 * 1000);

    user.resetToken = resetToken;

    user.resetTokenExpire = resetTokenExpire;

    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    try {
      await sendResetPasswordEmail(user.email, resetLink);
    } catch (mailErr) {
      console.error("Reset email error:", mailErr);

      return res

        .status(500)

        .json({ error: "Could not send reset email. Please try again." });
    }

    return res.json({
      message: "Reset link sent to your email.",
    });
  } catch (err) {
    console.error("API /api/auth/forgot-password error:", err);

    return res.status(500).json({ error: err?.message || "Server error" });
  }
});


// Reset Password

app.post("/api/auth/reset-password/:token", async (req, res) => {

  try {

    const { token } = req.params;

    const { password } = req.body;

    if (!password?.trim()) {

      return res.status(400).json({ error: "New password is required." });

    }

    if (password.trim().length < 6) {

      return res

        .status(400)

        .json({ error: "Password must be at least 6 characters." });

    }

    const user = await User.findOne({

      resetToken: token,

      resetTokenExpire: { $gt: new Date() },

    });

    if (!user) {

      return res.status(400).json({ error: "Invalid or expired reset link." });

    }

    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    user.password = hashedPassword;

    user.resetToken = "";

    user.resetTokenExpire = null;

    await user.save();

    return res.json({

      message: "Password reset successfully. You can now log in.",

    });

  } catch (err) {

    console.error("API /api/auth/reset-password error:", err);

    return res.status(500).json({ error: err?.message || "Server error" });

  }

});
 
/* =========================

   AI Trip Plan Route

========================= */

app.post("/api/plan", async (req, res) => {
  try {
    const { style, budget, days, driving, savedPlaces = [] } = req.body;

    const prompt = `

You are a travel planner for Oman.

Create a ${days}-day itinerary based on:

- style: ${style}

- budget: ${budget || "not specified"}

- driving: ${driving}

Saved places (must prioritize these if provided):

${savedPlaces.map((p) => `- ${p.title} (${p.category})`).join("\n")}

Return ONLY valid JSON (no markdown, no extra text) with this schema:

{

  "title": string,

  "summary": string,

  "days": [

    {

      "day": number,

      "title": string,

      "items": [

        {

          "time": "Morning"|"Afternoon"|"Evening",

          "place": string,

          "city": string,

          "why": string

        }

      ]

    }

  ]

}

`;

    const response = await client.responses.create({
      model: "gpt-4o-mini",

      input: prompt,

      text: { format: { type: "json_object" } },
    });

    const text = response.output_text;

    const data = JSON.parse(text);

    return res.json(data);
  } catch (err) {
    console.error("API /api/plan error:", err);

    return res.status(500).json({ error: err?.message || "Server error" });
  }
});

/* =========================

   Start Server After MongoDB

========================= */

async function startServer() {
  try {
    console.log("MONGODB_URI exists:", !!process.env.MONGODB_URI);

    console.log("Connecting to MongoDB...");

    await mongoose.connect(MONGODB_URI);

    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`API running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

startServer();
