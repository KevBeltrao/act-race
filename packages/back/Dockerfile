FROM node:20

RUN yarn global add @nestjs/cli

WORKDIR /raceofemotions/src/app
COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["node", "dist/main"]
