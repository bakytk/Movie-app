
FROM node:14.15-alpine
WORKDIR /app

# build step
FROM node:14-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY tsconfig*.json ./
COPY src src
RUN npm run build

# run step
FROM node:14-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY start.sh ./
COPY .env ./
COPY --from=builder /app/dist/ dist/
EXPOSE 17000

RUN chmod +x start.sh
ENTRYPOINT [ "/app/start.sh" ]
