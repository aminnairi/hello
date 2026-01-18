FROM node:25.2.1-alpine3.22 AS build

USER node

WORKDIR /home/node

COPY --chown=node:node . .

RUN npm i && npm -w applications/server run build && npm -w applications/web run build

FROM node:25.2.1-alpine3.22 AS server

USER node

WORKDIR /home/node

COPY --chown=node:node --from=build /home/node/applications/server/package.json /home/node/package.json
COPY --chown=node:node --from=build /home/node/applications/server/dist /home/node/dist

RUN npm i --omit=dev

CMD [ "npm", "start" ]

EXPOSE 8000

FROM node:25.2.1-alpine3.22 AS web

USER node

WORKDIR /home/node

COPY --chown=node:node --from=build /home/node/applications/web/package.json /home/node/package.json
COPY --chown=node:node --from=build /home/node/applications/web/dist /home/node/dist

RUN npm i --omit=dev

CMD [ "npm", "start" ]

EXPOSE 8001
