'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var logger = require("../util/logger");
var armqp = require("amqplib");
var rmq;
exports.rmq = rmq;
var initrmq = function () { return __awaiter(_this, void 0, void 0, function () {
    var _a, ch, _b, _c, _d, err_1;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 7, , 8]);
                if (rmq)
                    return [2 /*return*/];
                exports.rmq = rmq = {};
                _a = rmq;
                return [4 /*yield*/, armqp.connect(global.rmqHost)];
            case 1:
                _a.conn = _e.sent();
                return [4 /*yield*/, rmq.conn.createChannel()];
            case 2:
                ch = _e.sent();
                _b = rmq;
                return [4 /*yield*/, ch.assertExchange(global.exName, 'topic')];
            case 3:
                _b.ex = _e.sent();
                ch.close();
                //Msg Queue to receive work for parsing
                rmq.receive = {};
                _c = rmq.receive;
                return [4 /*yield*/, rmq.conn.createChannel()];
            case 4:
                _c.ch = _e.sent();
                rmq.receive.qName = global.queueName;
                return [4 /*yield*/, rmq.receive.ch.assertQueue(rmq.receive.qName)];
            case 5:
                _e.sent();
                rmq.receive.ch.prefetch(1);
                rmq.receive.bindQueue = function (source, pattern, args) {
                    return new Promise(function (resolve, reject) {
                        rmq.receive.ch.bindQueue(rmq.receive.qName, source, pattern, args).then(resolve).catch(reject);
                    });
                };
                rmq.receive.consume = function (onMessage, options) {
                    return new Promise(function (resolve, reject) {
                        rmq.receive.ch.consume(rmq.receive.qName, onMessage, options).then(resolve).catch(reject);
                    });
                };
                //Msg Queue to consume the work for parsing
                rmq.send = {};
                _d = rmq.send;
                return [4 /*yield*/, rmq.conn.createChannel()];
            case 6:
                _d.ch = _e.sent();
                rmq.send.publish = function (routingKey, content, options) {
                    return rmq.send.ch.publish(rmq.ex.exchange, "auditlogs." + routingKey, content, options);
                };
                return [3 /*break*/, 8];
            case 7:
                err_1 = _e.sent();
                logger.error(err_1);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.initrmq = initrmq;
