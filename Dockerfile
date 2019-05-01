# https://hub.docker.com/_/node/
FROM node:10-jessie

EXPOSE 8080
ENV BEKKRADAR_PORT 8080

# install required utils
RUN apt-get update && apt-get install -y bzip2 libfontconfig && apt-get clean

RUN mkdir -p /app
WORKDIR /app

# Set registry for speeding things up
RUN npm config set registry https://registry.npmjs.org/

# Set no progress to speed things up
RUN npm set progress=false

ADD package.json /app/package.json

RUN npm install --no-optional

ADD . /app

RUN npm run build-prod
CMD npm run start-prod
