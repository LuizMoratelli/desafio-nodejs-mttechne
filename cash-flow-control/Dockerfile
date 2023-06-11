# Transpile/Compile
FROM node:16.15 AS build-cash-flow
WORKDIR /usr/src/cash-flow-control

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

# Run
FROM node:16.15
WORKDIR /usr/src/cash-flow-control

COPY package.json .
RUN npm install --omit=dev

COPY --from=build-cash-flow /usr/src/cash-flow-control/dist dist

EXPOSE 3001
CMD ["npm", "run", "start"]