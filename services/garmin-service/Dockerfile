FROM node:20-alpine
WORKDIR /app
COPY package.json ./
COPY packages ./packages
COPY services/garmin-service ./services/garmin-service
RUN npm install --workspace=services/garmin-service --omit=dev
WORKDIR /app/services/garmin-service
CMD ["npm", "start"]
