FROM node:alpine AS builder
    WORKDIR /idea
    COPY package*.json ./
    COPY conf_*.json ./
    RUN npm install
    COPY . .
    RUN npm run build

FROM node:alpine
    WORKDIR /idea
    RUN apk add tzdata
    RUN ln -s /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime
    ENV TZ=America/Sao_Paulo
    COPY --from=builder /idea/build ./build
    COPY --from=builder /idea/node_modules ./node_modules
    COPY --from=builder /idea/*.json ./
    COPY --from=builder /idea/conf_*.json ./