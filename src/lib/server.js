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
var RMQService_1 = require("./service/RMQService");
require('../config/index');
var jwt = require("jwt-simple");
var logger = require("./util/logger");
var cors = require("cors");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var express = require("express");
var router = express.Router();
var app = express();
var allowUnauthorizedAccess = [
    '/login',
];
// set port
app.set("port", global.port);
// set cors
app.use(cors({
    origin: function (origin, callback) {
        callback(null, true);
    },
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);
router.use(function (req, res, next) {
    if (allowUnauthorizedAccess.indexOf(req._parsedUrl.pathname) > -1) {
        return next();
    }
    if (req.headers['authorization']) {
        var authHdr = req.headers['authorization'];
        if (global.allowedApiKeys.indexOf(authHdr) > -1) {
            return next();
        }
        else {
            var token = authHdr.substr(-1 * (authHdr.length - 4));
            req.decoded = jwt.decode(token, '', true);
            return next();
        }
    }
    else {
        return res.status(403).send({
            success: false,
            message: 'Not Authorized.'
        });
    }
});
var init = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, RMQService_1.initrmq()];
            case 1:
                _a.sent();
                app.listen(app.get('port'), function () {
                    logger.info('Auditlogs started on port ' + app.get('port'));
                });
                return [2 /*return*/];
        }
    });
}); };
// lets run this thing
init();
