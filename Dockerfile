FROM node:14-alpine as base
EXPOSE 15001
WORKDIR /app
COPY package*.json .npmrc* ./
RUN npm install

COPY . .

RUN npm run-script build
RUN echo "" > .npmrc

FROM base as DEBUG
CMD [ "npm", "run", "start:local"]

FROM base

CMD [ "npm", "run", "serve"]
