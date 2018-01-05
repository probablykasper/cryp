FROM node:8.9

COPY src/package.json .

RUN npm install -g  nodemon@1.14.6
RUN npm install

WORKDIR /usr/src/app

COPY src .

CMD npm run $ENV
