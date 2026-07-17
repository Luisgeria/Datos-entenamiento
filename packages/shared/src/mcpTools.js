/**
 * Contrato único de tools MCP. Alcance actual: solo Garmin (+ enriquecimiento
 * de viento sobre sus tracks). Si más adelante se añade otra plataforma,
 * se registra aquí y se implementa su handler en mcp-orchestrator/src/tools.
 */

const mcpTools = [
  {
    name: "get_workouts",
    description: "Lista entrenamientos recientes de Garmin (ritmo, potencia, FC, splits, récords).",
    inputSchema: {
      type: "object",
      properties: {
        from: { type: "string", description: "Fecha ISO de inicio" },
        to: { type: "string", description: "Fecha ISO de fin" },
      },
    },
  },
  {
    name: "get_hrv",
    description: "Variabilidad de frecuencia cardíaca (HRV) y readiness de entrenamiento (Garmin).",
    inputSchema: {
      type: "object",
      properties: { days: { type: "number", default: 7 } },
    },
  },
  {
    name: "get_sleep",
    description: "Datos de sueño de Garmin: fases, duración, calidad, Body Battery.",
    inputSchema: {
      type: "object",
      properties: { days: { type: "number", default: 7 } },
    },
  },
  {
    name: "get_wind_analysis",
    description: "Cruza un track GPS de Garmin con el histórico meteorológico por tramos de 1 km para explicar variaciones de ritmo/potencia.",
    inputSchema: {
      type: "object",
      properties: { workoutId: { type: "string" } },
      required: ["workoutId"],
    },
  },
];

module.exports = { mcpTools };
