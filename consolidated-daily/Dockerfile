# Transpile/Compile
FROM node:16.15 AS build-consolidated-daily
WORKDIR /usr/src/consolidated-daily

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

# Run
FROM node:16.15
WORKDIR /usr/src/consolidated-daily

COPY package.json .
RUN npm install --omit=dev

COPY --from=build-consolidated-daily /usr/src/consolidated-daily/dist dist

EXPOSE 3002
CMD ["npm", "run", "start"]