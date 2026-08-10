require("dotenv").config();
const path = require("path");
const express = require("express");
const db = require("./db");

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const TOTAL_MODULES = 4;

const app = express();
app.use(express.json());

// Serve frontend build
const frontendDist = path.join(__dirname, "..", "frontend", "dist");
app.use(express.static(frontendDist));

// POST /api/submit
app.post("/api/submit", (req, res) => {
  const { email, moduleId, retries, date } = req.body;

  if (!email || !moduleId || !date) {
    return res.status(400).json({ success: false, message: "email, moduleId and date are required" });
  }

  db.prepare(`
    INSERT INTO results (email, module_id, retries, score, date)
    VALUES (?, ?, ?, 100, ?)
    ON CONFLICT(email, module_id)
    DO UPDATE SET retries = excluded.retries, score = excluded.score, date = excluded.date
  `).run(email, moduleId, retries || 0, date);

  res.json({ success: true });
});

// GET /api/config
app.get("/api/config", (req, res) => {
  res.json({
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
  });
});

// GET /api/results
app.get("/api/results", (req, res) => {
  const rows = db
    .prepare("SELECT email, module_id, retries, score, date FROM results ORDER BY email, module_id")
    .all();

  const flat = rows.map((row) => ({
    email: row.email,
    moduleId: row.module_id,
    score: row.score,
    retries: row.retries,
    date: row.date,
  }));

  res.json(flat);
});

// GET /api/progress/:email
app.get("/api/progress/:email", (req, res) => {
  const email = req.params.email;

  const moduleIds = db
    .prepare("SELECT module_id FROM results WHERE email = ? ORDER BY module_id")
    .all(email)
    .map((row) => row.module_id);

  const quizScores = {};
  moduleIds.forEach((id) => { quizScores[id] = true });

  const currentModule = moduleIds.length === 0 ? 1 : Math.min(moduleIds.length + 1, TOTAL_MODULES);

  res.json({
    completedModules: moduleIds,
    quizScores,
    currentModule,
  });
});

// GET /admin
app.get("/admin", (req, res) => {
  const password = req.query.password;
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).send("Unauthorized");
  }
  res.sendFile(path.join(__dirname, "admin.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:3000");
});
