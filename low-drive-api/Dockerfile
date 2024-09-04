# Stage 1: Build stage
FROM node:20-alpine3.16 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Stage 2: Development stage
FROM node:20-alpine3.16 AS dev

WORKDIR /app

COPY --from=build /app /app

EXPOSE 3000

CMD ["npm", "run", "dev"]

# Stage 3: Production stage
FROM node:20-alpine3.16 AS prod

WORKDIR /app

COPY --from=build /app /app

RUN npm ci --only=prod

EXPOSE 3000

CMD ["npm", "start"]
