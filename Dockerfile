FROM node:20.11-alpine as build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

FROM node:20.11-alpine as main

WORKDIR /app

COPY --from=build /app /app

EXPOSE ${PORT}

CMD npx prisma migrate dev && npm run start:dev