# FitMCP

Puente entre Garmin Connect y asistentes de IA vía **MCP** (Model Context Protocol).
Cuenta permanente creada solo con email (sin verificación, sin trial, sin suscripción):
el link MCP generado no caduca.

## Estructura

```
fitmcp-clone/
├── docker-compose.yml
├── services/
│   ├── mcp-orchestrator/   # Servidor MCP (SSE) por usuario + cuentas (solo email)
│   ├── garmin-service/     # Integración Garmin Connect (garmin-connect@1.6.2)
│   └── weather-service/    # Histórico meteorológico (Open-Meteo) para análisis de viento
├── apps/
│   └── frontend/           # Landing + consola (React + Vite + Tailwind)
├── packages/
│   └── shared/             # Definición de las tools MCP
└── mcp-client-test.js      # Cliente MCP de prueba (simula lo que hace Claude)
```

## Cómo levantarlo

```bash
cp .env.example .env
docker compose up --build
```

- Frontend: http://localhost:5173
- MCP orchestrator: http://localhost:4100

## Flujo de cuenta

1. Email en la landing → `POST /signup` crea (o recupera, es idempotente) la
   cuenta y devuelve `userId` + `mcpUrl`.
2. En la consola, conectar Garmin con usuario/contraseña. La contraseña NO se
   guarda: se usa una vez para obtener tokens OAuth, que se persisten en el
   volumen `garmin-tokens` (sobreviven a reinicios del servicio).
3. Copiar el link MCP (`/mcp/:userId`) y pegarlo en el conector de la IA.
4. Cuenta y link **no caducan**.

## Verificado (probado en local, no solo escrito)

- ✅ Signup idempotente + normalización de email + 404 en cuentas inexistentes.
- ✅ Cliente MCP real (SDK oficial) conecta por SSE, hace handshake, lista las
  4 tools (`get_workouts`, `get_hrv`, `get_sleep`, `get_wind_analysis`) y las llama.
- ✅ Los errores de los servicios llegan a la IA con mensaje útil, no con un
  código HTTP (ej. "Usuario no conectado a Garmin. Conecta tu cuenta desde la consola.").
- ✅ Login Garmin con credenciales inválidas devuelve error claro.
- ✅ Frontend compila (`npm run build`).
- ✅ API de `garmin-connect@1.6.2` verificada contra sus tipos reales:
  `getActivities(start, limit)`, `getSleepData(date)`, `exportTokenToFile`, etc.

## Limitaciones conocidas (importante)

1. **2FA de Garmin NO soportado.** La librería `garmin-connect` tiene el MFA
   como TODO interno. Si la cuenta tiene verificación en dos pasos, el login
   falla (con mensaje claro en la consola). Alternativa futura: sidecar Python
   con la librería `garth`, que sí soporta MFA.
2. **HRV y track GPS usan endpoints internos de Garmin** (`hrv-service/hrv/{date}`
   y `activity-service/activity/{id}/details`) vía el `client.get()` autenticado
   de la librería. Son los mismos que usa la web de Garmin, pero al ser no
   oficiales pueden cambiar sin aviso. Pendiente validar con una cuenta real.
3. El análisis de viento usa Open-Meteo (API pública sin clave); probado el
   código, la llamada externa se validará en tu máquina.
4. Sin autenticación en la consola más allá del email: cualquiera que conozca
   un `userId` (UUID) podría usar ese link MCP. Para producción, conviene
   añadir al menos un token secreto rotable en lugar del userId directo.

## Probar el servidor MCP a mano

```bash
node mcp-client-test.js <userId>
```
