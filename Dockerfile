
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
# more info: https://github.com/krallin/tini
# RUN apk add --no-cache tini
WORKDIR /app
# RUN chown node:node .
# USER node
COPY package*.json ./
RUN npm install
COPY --from=builder /app/dist/ dist/
EXPOSE 8080

RUN chmod +x start.sh
ENTRYPOINT [ "/app/start.sh" ]
#ENTRYPOINT [ "/sbin/tini","--", "node", "dist/server.js" ]
