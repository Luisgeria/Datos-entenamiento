FROM node:20-alpine
WORKDIR /app
COPY package.json ./
COPY packages ./packages
COPY services/weather-service ./services/weather-service
RUN npm install --workspace=services/weather-service --omit=dev
WORKDIR /app/services/weather-service
CMD ["npm", "start"]
