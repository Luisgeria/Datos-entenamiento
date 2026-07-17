FROM node:20-alpine
WORKDIR /app
COPY package.json ./
COPY packages ./packages
COPY services/mcp-orchestrator ./services/mcp-orchestrator
RUN npm install --workspace=services/mcp-orchestrator --omit=dev
WORKDIR /app/services/mcp-orchestrator
CMD ["npm", "start"]
