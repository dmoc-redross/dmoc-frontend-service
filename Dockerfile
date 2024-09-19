# Stage 1: Build
FROM node:16-alpine as builder

WORKDIR /app

COPY package.json .
RUN npm install --force

COPY . .

# Add any build steps if needed
# For example, you might run a build command like: RUN npm run build

# Stage 2: Create a smaller final image
FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app .

EXPOSE 3000

CMD ["npm", "start"]
