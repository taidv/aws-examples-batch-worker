FROM node:12-alpine AS builder
WORKDIR /tmp
COPY . .
COPY src/ src/
RUN [ "yarn", "install" ]
RUN [ "yarn", "build" ]

FROM node:12-alpine AS checker
WORKDIR /tmp
COPY --from=builder /tmp/ .
RUN [ "yarn", "check" ]

FROM node:12-alpine AS tester
WORKDIR /tmp
COPY --from=builder /tmp/ .
RUN [ "yarn", "test" ]

FROM node:12-alpine AS server
USER node
WORKDIR /home/node/
COPY --from=builder /tmp/node_modules /home/node/node_modules
COPY --from=builder /tmp/dist /home/node/dist
COPY --from=builder /tmp/package.json /home/node/
ENTRYPOINT [ "yarn", "start" ]
