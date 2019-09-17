FROM node:carbon

RUN apt-get update && apt-get -y install inotify-tools 

WORKDIR /usr/app/backend
EXPOSE 3001
CMD [ "npm", "run-script", "dev" ]