const fs = require("fs");
const path = require("path");
const { GarminConnect } = require("garmin-connect");

/**
 * IMPORTANTE (verificado contra garmin-connect@1.6.2):
 * - La librería NO soporta 2FA/MFA (su código interno tiene "TODO: Handle MFA").
 *   Si la cuenta Garmin tiene verificación en dos pasos activada, el login falla.
 *   Solución hoy: desactivar 2FA en la cuenta Garmin, o (futuro) un sidecar
 *   Python con la librería `garth`, que sí lo soporta.
 * - Sí soporta persistir la sesión: exportTokenToFile / loadTokenByFile.
 *   Los tokens OAuth se guardan en disco (volumen Docker) por userId, así la
 *   sesión sobrevive a reinicios del servicio sin volver a pedir contraseña.
 */

const TOKEN_DIR = process.env.GARMIN_TOKEN_DIR || "/data/garmin-tokens";
const clients = new Map(); // userId -> GarminConnect (caché en memoria)

function tokenPath(userId) {
  return path.join(TOKEN_DIR, userId);
}

async function login({ userId, username, password }) {
  const client = new GarminConnect({ username, password });

  try {
    await client.login();
  } catch (err) {
    const msg = String(err?.message || err);
    // El fallo típico con 2FA activado es no poder extraer el "ticket" del flujo SSO
    if (/ticket|mfa|csrf/i.test(msg)) {
      throw new Error(
        "No se pudo iniciar sesión. Si tu cuenta Garmin tiene verificación en dos pasos (2FA), " +
          "esta integración aún no la soporta: desactívala temporalmente en tu cuenta Garmin e inténtalo de nuevo."
      );
    }
    throw new Error("Credenciales de Garmin incorrectas o servicio no disponible.");
  }

  // Persistir tokens OAuth (no la contraseña) para sobrevivir reinicios
  fs.mkdirSync(tokenPath(userId), { recursive: true });
  client.exportTokenToFile(tokenPath(userId));

  clients.set(userId, client);
  return { status: "connected" };
}

async function getClient(userId) {
  if (clients.has(userId)) return clients.get(userId);

  // Rehidratar desde tokens guardados en disco
  const dir = tokenPath(userId);
  if (fs.existsSync(dir)) {
    const client = new GarminConnect();
    client.loadTokenByFile(dir);
    clients.set(userId, client);
    return client;
  }

  throw new Error("Usuario no conectado a Garmin. Conecta tu cuenta desde la consola.");
}

function isConnected(userId) {
  return clients.has(userId) || fs.existsSync(tokenPath(userId));
}

function disconnect(userId) {
  clients.delete(userId);
  fs.rmSync(tokenPath(userId), { recursive: true, force: true });
}

// --- Datos ---

async function getWorkouts(userId, { from, to, limit = 20 } = {}) {
  const client = await getClient(userId);
  // Firma real: getActivities(start, limit) — no acepta fechas, se filtra aquí
  const activities = await client.getActivities(0, Number(limit));

  const fromTs = from ? new Date(from).getTime() : null;
  const toTs = to ? new Date(to).getTime() : null;

  return activities.filter((a) => {
    const ts = new Date(a.startTimeLocal || a.startTimeGMT).getTime();
    if (fromTs && ts < fromTs) return false;
    if (toTs && ts > toTs) return false;
    return true;
  });
}

async function getSleep(userId, { days = 7 } = {}) {
  const client = await getClient(userId);
  // Firma real: getSleepData(date) — una fecha por llamada, se itera
  const results = [];
  for (let i = 0; i < Number(days); i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    try {
      const sleep = await client.getSleepData(date);
      results.push({ date: date.toISOString().slice(0, 10), sleep });
    } catch {
      results.push({ date: date.toISOString().slice(0, 10), sleep: null });
    }
  }
  return results;
}

async function getHRV(userId, { days = 7 } = {}) {
  const client = await getClient(userId);
  // La librería no tiene método de HRV, pero expone client.get() autenticado.
  // Endpoint real de Garmin Connect usado por sus propias apps:
  //   https://connectapi.garmin.com/hrv-service/hrv/{YYYY-MM-DD}
  const results = [];
  for (let i = 0; i < Number(days); i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().slice(0, 10);
    try {
      const hrv = await client.get(`https://connectapi.garmin.com/hrv-service/hrv/${dateStr}`);
      results.push({ date: dateStr, hrv });
    } catch {
      results.push({ date: dateStr, hrv: null });
    }
  }
  return results;
}

async function getTrack(userId, activityId) {
  const client = await getClient(userId);
  // Endpoint real de detalles con polyline GPS (el que usa la web de Garmin):
  //   activity-service/activity/{id}/details
  const details = await client.get(
    `https://connectapi.garmin.com/activity-service/activity/${activityId}/details?maxChartSize=2000&maxPolylineSize=2000`
  );

  const polyline = details?.geoPolylineDTO?.polyline || [];
  const points = polyline.map((p) => ({
    lat: p.lat,
    lon: p.lon,
    time: p.time ? new Date(p.time).toISOString() : null,
  }));

  const startTime =
    points[0]?.time ||
    (details?.summaryDTO?.startTimeLocal
      ? new Date(details.summaryDTO.startTimeLocal).toISOString()
      : new Date().toISOString());

  return { startTime, points };
}

module.exports = { login, getClient, isConnected, disconnect, getWorkouts, getSleep, getHRV, getTrack };
