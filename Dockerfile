FROM node:8.4.0

ENV APP_PATH=/usr/src/app
ENV NPM_CONFIG_LOGLEVEL=warn

WORKDIR $APP_PATH
COPY . $APP_PATH

RUN apt-getupdate -qq -y && apt-get install -y cron && chmod +x $APP_PATH/docker/*

RUN npm i -g typescript@2.5.2 tslint@4.0.1 && npm i && npm cache clear && npm run build

EXPOSE 8080
CMD ["./docker/run.sh"]