FROM node:16-alpine3.14

RUN apk add --no-cache bash
RUN wget -O /bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x /bin/wait-for-it.sh

WORKDIR /usr/app

COPY ./package.json ./
RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]