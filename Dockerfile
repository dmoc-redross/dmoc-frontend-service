#FROM node:16-alpine
#WORKDIR /src
#COPY package*.json ./
#RUN npm install --force
#COPY . .
#RUN npm run build
#EXPOSE 3000
#CMD ["npm", "run", "start"]

FROM node:16.13.0 as builder

WORKDIR /app/src

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build:production

# Stage 2: Create the production image
FROM nginx:alpine

COPY --from=builder /app/src/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
