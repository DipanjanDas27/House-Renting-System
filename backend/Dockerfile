FROM node:24.0.0-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

RUN mkdir -p /app/public/temp

EXPOSE 8000

CMD ["npm", "start"]