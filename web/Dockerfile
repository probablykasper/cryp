FROM node:8.9

COPY package.json .

RUN npm install -g  nodemon@1.14.x
RUN npm install -g  webpack
RUN npm install

WORKDIR /usr/src/app

COPY . .

CMD npm run $ENV
