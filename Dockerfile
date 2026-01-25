FROM node:25.2.1-alpine3.22 AS build

USER node

WORKDIR /home/node

COPY --chown=node:node . .

RUN npm i && npm -w applications/server run build && npm -w applications/web run build

FROM node:25.2.1-alpine3.22 AS server

LABEL org.opencontainers.image.authors="Amin NAIRI"
LABEL org.opencontainers.image.source="https://github.com/aminnairi/hello"
LABEL org.opencontainers.image.description="Web application for hello"
LABEL version="1.0.0"

USER node

WORKDIR /home/node

COPY --chown=node:node --from=build /home/node/applications/server/package.json /home/node/package.json
COPY --chown=node:node --from=build /home/node/applications/server/dist /home/node/dist

RUN npm i --omit=dev

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD wget --no-verbose --tries=1 --spider http://localhost:8000 || exit 1

CMD [ "npm", "start" ]

FROM node:25.2.1-alpine3.22 AS web

LABEL org.opencontainers.image.authors="Amin NAIRI"
LABEL org.opencontainers.image.source="https://github.com/aminnairi/hello"
LABEL org.opencontainers.image.description="Server for hello"
LABEL version="1.0.0"

USER node

WORKDIR /home/node

COPY --chown=node:node --from=build /home/node/applications/web/package.json /home/node/package.json
COPY --chown=node:node --from=build /home/node/applications/web/dist /home/node/dist

RUN npm i --omit=dev

EXPOSE 8001

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD wget --no-verbose --tries=1 --spider http://localhost:8001/ || exit 1

CMD [ "npm", "start" ]
