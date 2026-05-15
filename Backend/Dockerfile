FROM node:18-alpine

WORKDIR /app

COPY Backend/package*.json ./

RUN npm install --only=production

COPY Backend/ .

EXPOSE 5000

CMD ["npm", "start"]