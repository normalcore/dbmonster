FROM node:alpine

WORKDIR /src/app

COPY . /src/app/

RUN npm install

CMD ["npm", "start"]