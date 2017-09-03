'use strict';
import * as winston from 'winston';

let Logger = winston.Logger;
let transports = [];
let exceptionHandlers = [];

transports.push(
    new (winston.transports.Console)({
        level: 'debug',
        colorize: false,
        timestamp: true,
        prettyprint: true,
        json: false
    })
);

exceptionHandlers.push(
    new (winston.transports.Console)({
        colorize: false,
        timestamp: true,
        prettyprint: true,
        json: true
    })
);

let logger = new Logger({
    transports: transports,
    exceptionHandler: exceptionHandlers
});

export default logger;