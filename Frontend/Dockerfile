FROM node:20-alpine as build

WORKDIR /app

ARG VITE_API_URL=http://localhost:5000

COPY Frontend/package*.json ./

RUN npm install

COPY Frontend/ .

RUN VITE_API_URL=$VITE_API_URL npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config for React routing
COPY Frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]