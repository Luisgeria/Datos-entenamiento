const GARMIN_URL = process.env.GARMIN_SERVICE_URL || "http://garmin-service:4101";
const WEATHER_URL = process.env.WEATHER_SERVICE_URL || "http://weather-service:4104";

async function callService(url, path, { method = "GET", body } = {}) {
  const res = await fetch(`${url}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    // Propagar el mensaje real del servicio (ej. "conecta tu cuenta Garmin")
    // para que llegue hasta la IA y esta pueda explicárselo al usuario.
    let detail = `${res.status}`;
    try {
      const errBody = await res.json();
      if (errBody?.error) detail = errBody.error;
    } catch {}
    throw new Error(detail);
  }
  return res.json();
}

/**
 * Cada handler recibe (args, ctx) donde ctx.userId identifica la cuenta dueña
 * de esta conexión MCP (viene del token en la URL privada /mcp/:userToken).
 *
 * Alcance actual: solo Garmin. Añadir otra plataforma más adelante = un
 * servicio nuevo + una entrada aquí + su tool en shared/mcpTools.js.
 */
const handlers = {
  async get_workouts(args, ctx) {
    const qs = new URLSearchParams({
      ...(args.from && { from: args.from }),
      ...(args.to && { to: args.to }),
    });
    return callService(GARMIN_URL, `/workouts/${ctx.userId}?${qs}`);
  },

  async get_hrv(args, ctx) {
    return callService(GARMIN_URL, `/hrv/${ctx.userId}?days=${args.days || 7}`);
  },

  async get_sleep(args, ctx) {
    return callService(GARMIN_URL, `/sleep/${ctx.userId}?days=${args.days || 7}`);
  },

  async get_wind_analysis(args, ctx) {
    const track = await callService(GARMIN_URL, `/workouts/${ctx.userId}/${args.workoutId}/track`);
    return callService(WEATHER_URL, "/wind-analysis", {
      method: "POST",
      body: { points: track.points, startTime: track.startTime },
    });
  },
};

module.exports = { handlers };
