FROM node:14

ENV PORT=3001 \
JWT_KEY=mysecretkey \
MONGO_DB_URI=mongodb://localhost:27017/crud \
MONGO_DB_TEST=mongodb://localhost:27017/crud_test

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]