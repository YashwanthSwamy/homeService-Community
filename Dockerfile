FROM node:14-alpine as base

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

EXPOSE 8085

CMD ["npm", "run", "serve"]
