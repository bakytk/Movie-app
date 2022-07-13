
FROM node:14.15-alpine
WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm ci --production

COPY . .
RUN chmod +x start.sh

ENTRYPOINT [ "/app/start.sh" ]
