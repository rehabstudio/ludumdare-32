FROM nodesource/wheezy:0.10.36
MAINTAINER Ryan Grieve <ryan@rehabstudio.com>

RUN npm install -g webpack
RUN npm install -g webpack-dev-server

WORKDIR /app

EXPOSE 8080
