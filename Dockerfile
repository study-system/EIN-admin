FROM node:12-slim

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install serve -g
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["serve", "-p", "3000", "-s", "build"]