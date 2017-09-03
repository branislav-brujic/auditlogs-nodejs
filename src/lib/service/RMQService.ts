'use strict';
import logger from '../util/logger'
import * as armqp from 'amqplib';


let rmq: {
    conn?: armqp.Connection;
    ex?: armqp.Replies.AssertExchange;

    receive?: {
        ch?: armqp.Channel;
        qName?: string;
        consume?: (onMessage: (msg: armqp.Message) => any, options?: armqp.Options.Consume) => Promise<armqp.Replies.Consume>;
        bindQueue?: (source: string, pattern: string, args?: any) => Promise<armqp.Replies.Empty>;
    };
    send?: {
        ch?: armqp.Channel;
        publish?: (routingKey: string, content: Buffer, options?: armqp.Options.Publish) => boolean;
    };
};

let initrmq = async () => {
    try {

        if (rmq) return;
        rmq = {};
        rmq.conn = await armqp.connect(global.rmqHost);
        let ch = await rmq.conn.createChannel();
        rmq.ex = await ch.assertExchange(global.exName, 'topic');
        ch.close();


        //Msg Queue to receive work for parsing
        rmq.receive = {};
        rmq.receive.ch = await rmq.conn.createChannel();
        rmq.receive.qName = global.queueName;
        await rmq.receive.ch.assertQueue(rmq.receive.qName);
        rmq.receive.ch.prefetch(1);
        rmq.receive.bindQueue = (source: string, pattern: string, args?: any): Promise<armqp.Replies.Empty> => {
            return new Promise<armqp.Replies.Consume>((resolve, reject) => {
                rmq.receive.ch.bindQueue(rmq.receive.qName, source, pattern, args).then(resolve).catch(reject);
            });
        };

        rmq.receive.consume = (onMessage: (msg: armqp.Message) => any, options?: armqp.Options.Consume): Promise<armqp.Replies.Consume> => {
            return new Promise<armqp.Replies.Consume>((resolve, reject) => {
                rmq.receive.ch.consume(rmq.receive.qName, onMessage, options).then(resolve).catch(reject);
            });
        };

        //Msg Queue to consume the work for parsing
        rmq.send = {};
        rmq.send.ch = await rmq.conn.createChannel();
        rmq.send.publish = (routingKey: string, content: Buffer, options?: armqp.Options.Publish): boolean => {
            return rmq.send.ch.publish(rmq.ex.exchange, `auditlogs.${routingKey}`, content, options);
        };

    } catch (err) {
       return logger.error(err);
    }
};


export {
    initrmq,
    rmq
};
