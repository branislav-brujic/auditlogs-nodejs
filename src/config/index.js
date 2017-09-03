'use strict';
var getEnviroment = function (envName) {
    return process.env[envName];
};
global.env = getEnviroment('ENV');
global.port = getEnviroment('PORT');
global.mongoHost = getEnviroment('mongoHost');
global.mongoPort = getEnviroment('mongoPort');
global.baseUrl = getEnviroment('baseUrl');
global.rmqHost = getEnviroment('rmqHost');
global.exName = getEnviroment('exName');
global.queueName = getEnviroment('queueName');
global.allowedApiKeys = getEnviroment('allowedApiKeys');
