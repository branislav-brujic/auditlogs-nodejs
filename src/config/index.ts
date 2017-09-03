'use strict';

declare namespace NodeJS {
    interface Global {
        env: string,
        port: string,
        mongoHost: string,
        mongoPort: string,
        baseUrl: string,
        rmqHost: string,
        exName: string,
        queueName: string,
        allowedApiKeys: string,
    }
}

let getEnviroment = (envName) => {
    return process.env[envName]
};

global.env = getEnviroment('ENV') || 'local';
global.port = getEnviroment('PORT') || '3000';
global.mongoHost = getEnviroment('mongoHost') || 'mongodb';
global.mongoPort = getEnviroment('mongoPort') || '5607';
global.baseUrl = getEnviroment('baseUrl') || 'http://localhost:3000';
global.rmqHost = getEnviroment('rmqHost') || 'amqp://rmq';
global.exName = getEnviroment('exName') || 'vc.ex';
global.queueName = getEnviroment('queueName') || 'vc.q.auditlogs';
global.allowedApiKeys = getEnviroment('allowedApiKeys') || '!TGRSFERTWQ$#';