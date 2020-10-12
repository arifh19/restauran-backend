FROM node:lts-alpine

RUN mkdir -p /backend
WORKDIR /backend
COPY package*.json ./
COPY . ./
RUN npm install
VOLUME /backend/logfile
EXPOSE 3000
CMD ["node", "app.js"]