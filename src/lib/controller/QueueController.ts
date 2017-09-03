'use strict';
import logger from '../util/logger';
import {rmq} from '../service/RMQService';
import {insertLog} from '../dao/AuditlogsDAO';


let start = (): Promise<any> => {
    rmq.receive.bindQueue(rmq.ex.exchange, '#.log');

    return rmq.receive.consume(async (msg) => {
        try {
            logger.debug('Log recieved');

            let routingKey = msg.fields.routingKey.split('.');

            if (routingKey[1] === 'log') {
                let data = JSON.parse(msg.content.toString());
                let postData = data['post_data'];
                console.log(postData);

                insertLog(postData)
                    .then((res) => {
                        logger.info('Successfully added log ' + res.id);
                    }).catch((err) => {
                    logger.error(err);
                });
            }

            rmq.receive.ch.ack(msg);

        } catch (err) {
            logger.error(err);
            rmq.receive.ch.ack(msg);
        }
    });
};

export {
    start
};
