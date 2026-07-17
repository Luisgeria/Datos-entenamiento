const express = require("express");
const garmin = require("./garminClient");

const app = express();
app.use(express.json());

// CORS simple para que el frontend (5173) pueda llamar directamente
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL || "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

const PORT = process.env.GARMIN_PORT || 4101;

app.get("/health", (_req, res) => res.json({ ok: true, service: "garmin-service" }));

app.post("/auth/login", async (req, res) => {
  try {
    const { userId, username, password } = req.body;
    if (!userId || !username || !password) {
      return res.status(400).json({ error: "userId, username y password son obligatorios" });
    }
    const result = await garmin.login({ userId, username, password });
    res.json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

app.get("/auth/status/:userId", (req, res) => {
  res.json({ connected: garmin.isConnected(req.params.userId) });
});

app.delete("/auth/:userId", (req, res) => {
  garmin.disconnect(req.params.userId);
  res.json({ status: "disconnected" });
});

app.get("/workouts/:userId", async (req, res) => {
  try {
    res.json(await garmin.getWorkouts(req.params.userId, req.query));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/hrv/:userId", async (req, res) => {
  try {
    res.json(await garmin.getHRV(req.params.userId, req.query));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/sleep/:userId", async (req, res) => {
  try {
    res.json(await garmin.getSleep(req.params.userId, req.query));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/workouts/:userId/:workoutId/track", async (req, res) => {
  try {
    res.json(await garmin.getTrack(req.params.userId, req.params.workoutId));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`garmin-service escuchando en :${PORT}`));
