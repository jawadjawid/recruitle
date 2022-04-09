FROM node:current-alpine
COPY . /app
WORKDIR /app/
RUN npm install
WORKDIR /app/client
RUN npm install --force --save twilio-video use-twilio-video
RUN npm install
RUN npm run build
WORKDIR /app/
EXPOSE 80
ENTRYPOINT ["node", "app.js"]
