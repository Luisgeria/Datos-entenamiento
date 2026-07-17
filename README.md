# Storytelling: el poder del relato en la comunicación

Plan autodidacta avanzado (React + Vite + Tailwind) para el curso de
storytelling: 4 fases, 7 módulos, contenido desarrollado, autoevaluaciones
interactivas con checklist y comprobación de respuestas, y progreso
guardado automáticamente en el navegador (`localStorage`).

## Desarrollo local

```bash
npm install
npm run dev
```

## Compilar para producción

```bash
npm run build
```

Genera la carpeta `dist/` lista para desplegar en cualquier hosting estático
(Vercel, Netlify, GitHub Pages, etc.).

## Estructura

```
src/
  App.jsx        # Componente principal (datos del curso + UI)
  main.jsx       # Punto de entrada de React
  index.css      # Tailwind + estilos base
index.html
tailwind.config.js
postcss.config.js
vite.config.js
```

## Notas

- El progreso (módulos completados y checklist de autoevaluación) se
  guarda en `localStorage`, de forma local en cada navegador. No hay
  backend ni sincronización entre dispositivos.
- Las fuentes (Fraunces, Inter, IBM Plex Mono) se cargan desde Google
  Fonts en tiempo de ejecución.
