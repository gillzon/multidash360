FROM node:14 AS ui-build
WORKDIR /usr/src/app
COPY client/ ./multidash360/client
RUN cd multidash360/client && npm install && npm run build

FROM node:14 AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/multidash360/client/build ./multidash360/build
COPY package*.json ./api/
RUN cd api && npm install
COPY server/index.js ./api/

EXPOSE 3001

CMD ["node", "./api/index.js"]
