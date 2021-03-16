FROM node:14
ENV __DIR  /usr/src/app
#ENV http_proxy=http://company.proxy

WORKDIR $__DIR

COPY package*.json ./

#RUN npm config set proxy $http_proxy
RUN npm install

COPY . /usr/src/app

# CMD ["node", "index.js"]