FROM node:lts-hydrogen


WORKDIR /app

COPY . .

RUN npm install

ARG APP_PORT
ENV PORT=${APP_PORT}
EXPOSE ${APP_PORT}

CMD [ "npm", "run", "start" ]
