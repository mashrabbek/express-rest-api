FROM node:14
ENV __DIR  /usr/src/app

WORKDIR $__DIR

COPY package*.json ./

RUN npm install

COPY . /usr/src/app

# CMD ["node", "index.js"]