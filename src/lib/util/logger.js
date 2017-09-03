'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var winston = require("winston");
var Logger = winston.Logger;
var transports = [];
transports.push(new (winston.transports.Console)({
    level: 'debug',
    colorize: false,
    timestamp: true,
    prettyprint: true,
    json: false
}));
var exceptionHandlers = [];
exceptionHandlers.push(new (winston.transports.Console)({
    colorize: false,
    timestamp: true,
    prettyprint: true,
    json: true
}));
var logger = new Logger({
    transports: transports,
    exceptionHandler: exceptionHandlers
});
exports.default = logger;
