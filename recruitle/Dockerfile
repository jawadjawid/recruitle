FROM node:current-alpine
COPY . /app
WORKDIR /app/
RUN npm install
WORKDIR /app/client
RUN npm install
RUN npm run build
WORKDIR /app/
ENTRYPOINT ["node", "app.js"]
