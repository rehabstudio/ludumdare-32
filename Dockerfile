FROM nodesource/wheezy:0.10.36
MAINTAINER Ryan Grieve <ryan@rehabstudio.com>

RUN npm install -g webpack > /dev/null
RUN npm install -g webpack-dev-server > /dev/null
RUN apt-get update && apt-get install -y nginx

WORKDIR /usr/share/nginx/www

# Install application dependencies and copy source into container
COPY package.json /usr/share/nginx/www/
RUN npm install > /dev/null
COPY . /usr/share/nginx/www

# build the application
RUN webpack -d --progress --colors

EXPOSE 80

CMD ["nginx", "-g", "daemon off; error_log stderr info;"]
