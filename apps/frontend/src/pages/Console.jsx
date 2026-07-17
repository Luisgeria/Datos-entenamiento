import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ORCHESTRATOR_URL = import.meta.env.VITE_MCP_ORCHESTRATOR_URL || "http://localhost:4100";
const GARMIN_URL = import.meta.env.VITE_GARMIN_SERVICE_URL || "http://localhost:4101";

export default function Console() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("fitmcp_user_id");
  const email = localStorage.getItem("fitmcp_email");

  const [mcpUrl, setMcpUrl] = useState(null);
  const [copied, setCopied] = useState(false);
  const [garminUser, setGarminUser] = useState("");
  const [garminPass, setGarminPass] = useState("");
  const [garminConnected, setGarminConnected] = useState(false);
  const [garminError, setGarminError] = useState(null);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    if (!userId) {
      navigate("/");
      return;
    }
    fetch(`${ORCHESTRATOR_URL}/account/${userId}/mcp-link`)
      .then((r) => r.json())
      .then((d) => setMcpUrl(d.url))
      .catch(() => {});

    // Estado real de conexión Garmin (persiste entre recargas y reinicios,
    // porque los tokens se guardan en el servidor)
    fetch(`${GARMIN_URL}/auth/status/${userId}`)
      .then((r) => r.json())
      .then((d) => setGarminConnected(Boolean(d.connected)))
      .catch(() => {});
  }, [userId, navigate]);

  async function connectGarmin(e) {
    e.preventDefault();
    setConnecting(true);
    setGarminError(null);
    try {
      const res = await fetch(`${GARMIN_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, username: garminUser, password: garminPass }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al conectar con Garmin");
      setGarminConnected(true);
      setGarminPass(""); // no retener la contraseña en el estado del navegador
    } catch (err) {
      setGarminError(err.message);
    } finally {
      setConnecting(false);
    }
  }

  async function disconnectGarmin() {
    await fetch(`${GARMIN_URL}/auth/${userId}`, { method: "DELETE" });
    setGarminConnected(false);
  }

  function copyMcpUrl() {
    navigator.clipboard.writeText(mcpUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="min-h-screen max-w-3xl mx-auto px-6 pt-16 pb-24">
      <h1 className="text-2xl font-bold font-mono mb-1">Tu consola</h1>
      <p className="text-gray-500 text-sm mb-8">{email}</p>

      <section className="bg-panel border border-white/10 rounded-xl p-6 mb-6">
        <h2 className="font-mono text-pulse text-sm uppercase mb-3">Link MCP privado</h2>
        <p className="text-gray-400 text-sm mb-4">
          Pega esta URL en el conector MCP de Claude, ChatGPT o Gemini CLI. No caduca.
        </p>
        <div className="flex gap-2">
          <code className="flex-1 bg-black/40 rounded-md px-3 py-2 text-sm break-all">
            {mcpUrl || "Generando..."}
          </code>
          <button
            onClick={copyMcpUrl}
            disabled={!mcpUrl}
            className="bg-pulse text-black font-semibold rounded-md px-4 text-sm shrink-0"
          >
            {copied ? "Copiado" : "Copiar"}
          </button>
        </div>
      </section>

      <section className="bg-panel border border-white/10 rounded-xl p-6">
        <h2 className="font-mono text-pulse text-sm uppercase mb-3">Garmin</h2>

        {garminConnected ? (
          <div className="flex items-center justify-between">
            <p className="text-pulse text-sm">Garmin conectado.</p>
            <button onClick={disconnectGarmin} className="text-gray-400 text-xs underline">
              Desconectar
            </button>
          </div>
        ) : (
          <form onSubmit={connectGarmin} className="flex flex-col gap-3">
            <p className="text-gray-400 text-sm">
              Tus credenciales se usan una sola vez para obtener un token de sesión.
              No se guarda tu contraseña.
            </p>
            <p className="text-amber text-xs">
              Nota: si tu cuenta Garmin tiene verificación en dos pasos (2FA),
              desactívala temporalmente para conectar — la integración aún no la soporta.
            </p>
            <input
              type="text"
              placeholder="Usuario / email de Garmin"
              value={garminUser}
              onChange={(e) => setGarminUser(e.target.value)}
              required
              className="bg-black/30 border border-white/10 rounded-md px-3 py-2 text-sm outline-none focus:border-pulse"
            />
            <input
              type="password"
              placeholder="Contraseña de Garmin"
              value={garminPass}
              onChange={(e) => setGarminPass(e.target.value)}
              required
              className="bg-black/30 border border-white/10 rounded-md px-3 py-2 text-sm outline-none focus:border-pulse"
            />
            <button
              type="submit"
              disabled={connecting}
              className="bg-pulse text-black font-semibold rounded-md py-2 text-sm disabled:opacity-50"
            >
              {connecting ? "Conectando..." : "Conectar"}
            </button>
            {garminError && <p className="text-red-400 text-sm">{garminError}</p>}
          </form>
        )}
      </section>
    </div>
  );
}
