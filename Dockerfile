FROM node:12-slim

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install serve -g
RUN npm install --production

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["serve", "-l", "3000", "-s", "build"]