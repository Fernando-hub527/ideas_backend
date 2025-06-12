FROM node:alpine AS builder
    WORKDIR /portaria
    COPY package*.json ./
    COPY conf_*.json ./
    RUN npm install
    COPY . .
    RUN npm run build

FROM node:alpine
    WORKDIR /portaria
    RUN apk add tzdata
    RUN ln -s /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime
    ENV TZ=America/Sao_Paulo
    COPY --from=builder /portaria/build ./build
    COPY --from=builder /portaria/node_modules ./node_modules
    COPY --from=builder /portaria/*.json ./
    COPY --from=builder /portaria/conf_*.json ./