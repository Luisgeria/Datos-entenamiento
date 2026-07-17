import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ORCHESTRATOR_URL = import.meta.env.VITE_MCP_ORCHESTRATOR_URL || "http://localhost:4100";

export default function Landing() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  async function createAccount(e) {
    e.preventDefault();
    setStatus("creating");
    try {
      const res = await fetch(`${ORCHESTRATOR_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al crear la cuenta");

      // Cuenta permanente: no hay código de verificación ni expiración.
      // Se guarda el userId localmente para volver a la consola sin volver a pedirlo.
      localStorage.setItem("fitmcp_user_id", data.userId);
      localStorage.setItem("fitmcp_email", email);
      navigate("/console");
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen">
      <header className="max-w-3xl mx-auto text-center pt-24 px-6">
        <p className="text-pulse font-mono text-xs uppercase tracking-widest">
          Conecta tu Garmin con tu IA
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mt-4 font-mono">
          Tu Garmin, en cualquier conversación con tu IA.
        </h1>
        <p className="text-gray-400 mt-6 leading-relaxed">
          Introduce tu email, conecta tu cuenta de Garmin, y pega tu link MCP
          privado en Claude, ChatGPT o Gemini. Sin suscripción, sin caducidad.
        </p>
      </header>

      <section className="max-w-md mx-auto mt-16 px-6">
        <form onSubmit={createAccount} className="bg-panel border border-white/10 rounded-xl p-6 flex flex-col gap-4">
          <label className="text-sm text-gray-400 font-mono">Tu email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="bg-black/30 border border-white/10 rounded-md px-3 py-2 outline-none focus:border-pulse"
          />
          <button
            type="submit"
            className="bg-pulse text-black font-semibold rounded-md py-2 hover:opacity-90 transition"
          >
            {status === "creating" ? "Creando cuenta..." : "Crear cuenta y conectar Garmin"}
          </button>
          {status === "error" && (
            <p className="text-red-400 text-sm">No se pudo crear la cuenta. Inténtalo de nuevo.</p>
          )}
        </form>
        <p className="text-gray-500 text-xs mt-3 text-center">
          Solo con el email. Tu cuenta y tu link MCP no caducan.
        </p>
      </section>

      <section className="max-w-3xl mx-auto mt-24 px-6 grid md:grid-cols-2 gap-6 pb-24">
        {[
          { title: "Lee", desc: "HRV, sueño, entrenamientos, récords de Garmin — accesibles desde el chat con tu IA." },
          { title: "Cruza", desc: "Analiza tus tracks GPS contra el histórico de viento, tramo a tramo." },
        ].map((f) => (
          <div key={f.title} className="border border-white/10 rounded-xl p-5">
            <h3 className="font-mono text-pulse text-sm uppercase mb-2">{f.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
