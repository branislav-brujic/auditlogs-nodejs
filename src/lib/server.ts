'use strict';
require('../config/index');
import {initrmq} from "./service/RMQService";
import * as QueueController from './controller/QueueController';
import logger from './util/logger'

let jwt = require("jwt-simple");
let cors = require("cors");
let bodyParser = require("body-parser");
let express = require("express");
let router = express.Router();
let app = express();
let allowUnauthorizedAccess = [
    '/login',
];

// set port
app.set("port", global.port);

// set cors
app.use(cors({
    origin: function (origin, callback) {
        callback(null, true)
    },
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(router);


router.use(function (req, res, next) {
    if (allowUnauthorizedAccess.indexOf(req._parsedUrl.pathname) > -1) {
        return next();
    }
    if (req.headers['authorization']) {
        let authHdr = req.headers['authorization'];
        if (global.allowedApiKeys.indexOf(authHdr) > -1) {
            return next();
        } else {
            let token = authHdr.substr(-1 * (authHdr.length - 4));
            req.decoded = jwt.decode(token, '', true);
            return next();
        }
    } else {
        return res.status(403).send({
            success: false,
            message: 'Not Authorized.'
        });
    }
});


let init = async () => {
    await initrmq();
    await QueueController.start();
    app.listen(app.get('port'), () => {
        logger.info('Auditlogs started on port ' + app.get('port'));
    });
};

// lets run this thing
init();