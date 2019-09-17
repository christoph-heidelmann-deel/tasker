FROM node:carbon

RUN apt-get update && apt-get -y install inotify-tools 

WORKDIR /usr/app
EXPOSE $PORT
CMD [ "npm", "run-script", "dev" ]