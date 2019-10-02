// var user_handler = require(__dirname+'/user/user_handler.js')
var user_handler = require(__dirname+'/user/user_handler');
const middlewareWebhook = require('@line/bot-sdk').middleware;
const messageEventProcessor = require('./events/message-event');
const messageFollowProcessor = require('./events/follow-event');
const config = {
    channelSecret: '9749f4ffa0b09b2836193f9c47e3c83f'
};

module.exports = function (app) {
    app.get('/users', user_handler.getAllUsers);
    app.post('/webhook', middlewareWebhook(config), (req, res) => {
        try {
            console.log('event', req.body.event);
            Array.from(req.body.events).map((event) => {
                console.log(event);
                messageEventProcessor(event);
                messageFollowProcessor(event);
            })
        } catch (error) {
            console.log('some err: ', error);            
        } finally {
            res.status(200);
        }
    });
};
