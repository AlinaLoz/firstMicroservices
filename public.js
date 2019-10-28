var amqp = require('amqplib/callback_api');

amqp.connect('amqp://icxntrgl:JoCm64xIUZdKfjFfJFU8mPwhVfKrVQPI@skunk.rmq.cloudamqp.com/icxntrgl', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'hello';
        var msg = 'Hello world';

        channel.assertQueue(queue, {
            durable: false
        });

        for (let i= 0; i< 20; i++) {
            channel.sendToQueue(queue, Buffer.from(msg));
            console.log(" [x] Sent %s", msg);
        }

    });
});
