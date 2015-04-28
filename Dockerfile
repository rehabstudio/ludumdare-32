FROM nodesource/wheezy:0.10.36
MAINTAINER Ryan Grieve <ryan@rehabstudio.com>

RUN npm install -g webpack
RUN npm install -g webpack-dev-server

WORKDIR /app

# Install application dependencies and copy source into container
COPY package.json /app/
RUN npm install
COPY . /app

# build the application
RUN webpack -d --progress --colors

EXPOSE 8080

CMD [ "python", "-m", "SimpleHTTPServer", "8080" ]
