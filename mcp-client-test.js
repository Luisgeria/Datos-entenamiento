const { Client } = require("@modelcontextprotocol/sdk/client/index.js");
const { SSEClientTransport } = require("@modelcontextprotocol/sdk/client/sse.js");

async function main() {
  const userId = process.argv[2];
  const transport = new SSEClientTransport(new URL(`http://localhost:4100/mcp/${userId}`));
  const client = new Client({ name: "test-client", version: "0.1.0" }, { capabilities: {} });

  await client.connect(transport);
  console.log("CONECTADO al servidor MCP");

  const { tools } = await client.listTools();
  console.log("TOOLS:", tools.map((t) => t.name).join(", "));

  // Llamar a una tool que dependerá de garmin-service (no está corriendo: debe fallar limpio)
  try {
    const result = await client.callTool({ name: "get_hrv", arguments: { days: 1 } });
    console.log("get_hrv:", JSON.stringify(result).slice(0, 200));
  } catch (e) {
    console.log("get_hrv fallo esperado (garmin-service apagado):", e.message.slice(0, 120));
  }

  await client.close();
}
main().catch((e) => { console.error("ERROR:", e.message); process.exit(1); });
