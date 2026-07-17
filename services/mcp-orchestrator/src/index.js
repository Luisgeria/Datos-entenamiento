const express = require("express");
const { Server } = require("@modelcontextprotocol/sdk/server/index.js");
const { SSEServerTransport } = require("@modelcontextprotocol/sdk/server/sse.js");
const {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} = require("@modelcontextprotocol/sdk/types.js");
const { mcpTools } = require("@fitmcp/shared");
const { handlers } = require("./tools/handlers");
const accounts = require("./accounts");

const app = express();
const PORT = process.env.MCP_ORCHESTRATOR_PORT || 4100;
const PUBLIC_URL = process.env.MCP_PUBLIC_URL || `http://localhost:${PORT}`;

app.use(express.json());

// CORS simple: el frontend llama directamente a /signup y /account
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL || "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

const activeTransports = new Map();

// --- Cuentas: solo email, sin caducidad, sin gateway ---
app.post("/signup", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "email requerido" });

    const account = await accounts.findOrCreateAccount(email.toLowerCase().trim());
    res.json({ userId: account.id, mcpUrl: `${PUBLIC_URL}/mcp/${account.id}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/account/:userId/mcp-link", async (req, res) => {
  const exists = await accounts.accountExists(req.params.userId);
  if (!exists) return res.status(404).json({ error: "Cuenta no encontrada" });
  res.json({ url: `${PUBLIC_URL}/mcp/${req.params.userId}` });
});

// --- Servidor MCP (SSE) por usuario ---
async function validateUserToken(userId) {
  const exists = await accounts.accountExists(userId);
  return { userId, valid: exists };
}

function buildServer(userId) {
  const server = new Server(
    { name: "fitmcp-clone", version: "0.1.0" },
    { capabilities: { tools: {} } }
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: mcpTools }));

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    const handler = handlers[name];
    if (!handler) throw new Error(`Tool desconocida: ${name}`);

    const result = await handler(args || {}, { userId });
    return { content: [{ type: "text", text: JSON.stringify(result) }] };
  });

  return server;
}

app.get("/mcp/:userId", async (req, res) => {
  const { userId, valid } = await validateUserToken(req.params.userId);
  if (!valid) return res.status(404).json({ error: "Cuenta no encontrada" });

  const transport = new SSEServerTransport(`/mcp/${userId}/messages`, res);
  activeTransports.set(transport.sessionId, transport);

  const server = buildServer(userId);
  await server.connect(transport);

  req.on("close", () => activeTransports.delete(transport.sessionId));
});

app.post("/mcp/:userId/messages", async (req, res) => {
  const transport = [...activeTransports.values()].find(
    (t) => t.sessionId === req.query.sessionId
  );
  if (!transport) return res.status(400).json({ error: "Sesión MCP no encontrada" });
  await transport.handlePostMessage(req, res, req.body);
});

app.get("/health", (_req, res) => res.json({ ok: true, service: "mcp-orchestrator" }));

accounts.initSchema().then(() => {
  app.listen(PORT, () => console.log(`mcp-orchestrator escuchando en :${PORT}`));
});
