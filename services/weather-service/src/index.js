const express = require("express");
const app = express();
app.use(express.json());

const PORT = process.env.WEATHER_PORT || 4104;

/**
 * Divide un track GPS en tramos de ~1km y devuelve, para cada tramo, el punto
 * central y su timestamp aproximado (usado para pedir el viento histórico de esa hora).
 */
function splitIntoKmSegments(points) {
  const segments = [];
  let segStart = 0;
  let accDist = 0;

  const haversine = (a, b) => {
    const R = 6371000;
    const dLat = ((b.lat - a.lat) * Math.PI) / 180;
    const dLon = ((b.lon - a.lon) * Math.PI) / 180;
    const lat1 = (a.lat * Math.PI) / 180;
    const lat2 = (b.lat * Math.PI) / 180;
    const h =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  };

  for (let i = 1; i < points.length; i++) {
    accDist += haversine(points[i - 1], points[i]);
    if (accDist >= 1000 || i === points.length - 1) {
      const mid = points[Math.floor((segStart + i) / 2)];
      segments.push({ km: segments.length + 1, point: mid, distance: accDist });
      segStart = i;
      accDist = 0;
    }
  }
  return segments;
}

/**
 * Llama a la API pública (y gratuita, sin API key) de Open-Meteo para
 * obtener viento histórico en una hora y coordenadas concretas.
 */
async function fetchHistoricalWind({ lat, lon, isoDateTime }) {
  const date = isoDateTime.slice(0, 10);
  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${date}&end_date=${date}&hourly=wind_speed_10m,wind_direction_10m`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Open-Meteo error: ${res.status}`);
  const data = await res.json();

  const hour = isoDateTime.slice(0, 13) + ":00"; // "YYYY-MM-DDTHH:00"
  const idx = data.hourly.time.findIndex((t) => t.startsWith(hour));

  return {
    windSpeedKmh: idx >= 0 ? data.hourly.wind_speed_10m[idx] : null,
    windDirectionDeg: idx >= 0 ? data.hourly.wind_direction_10m[idx] : null,
  };
}

app.get("/health", (_req, res) => res.json({ ok: true, service: "weather-service" }));

/**
 * Body esperado: { points: [{lat, lon, time}], startTime: ISO }
 * Devuelve el viento por cada tramo de 1km del track.
 */
app.post("/wind-analysis", async (req, res) => {
  try {
    const { points, startTime } = req.body;
    if (!Array.isArray(points) || points.length < 2) {
      return res.status(400).json({ error: "Se requieren al menos 2 puntos GPS" });
    }

    const segments = splitIntoKmSegments(points);

    const results = await Promise.all(
      segments.map(async (seg) => {
        const wind = await fetchHistoricalWind({
          lat: seg.point.lat,
          lon: seg.point.lon,
          isoDateTime: seg.point.time || startTime,
        });
        return { km: seg.km, ...wind };
      })
    );

    res.json({ segments: results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`weather-service escuchando en :${PORT}`));
