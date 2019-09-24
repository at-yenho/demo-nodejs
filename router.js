// var user_handler = require(__dirname+'/user/user_handler.js')
var user_handler = require(__dirname+'/user/user_handler');
var middleware = require(__dirname+'/middleware');
const middlewareWebhook = require('@line/bot-sdk').middleware
const config = {
    channelAccessToken: '9YOQdmCaJs3SGogyQ73ur+34o/zNVFPELIVAxN9Iu/42U0ZF/emtsDcULqVMeBm0PFPudOX7xR1SPUIuho+TqRX9ZpXWSbMRe4S25xMYgr7tnjp0IfSvmUu2eSVWOwgh/czy6H83tZ6WOOs7ZIUioQdB04t89/1O/w1cDnyilFU=',
    channelSecret: '9749f4ffa0b09b2836193f9c47e3c83f'
}
module.exports = function(app) {
    app.get('/users', user_handler.getAllUsers);
    app.post('/webhook', middlewareWebhook(config), (req, res) => {
        res.json(req.body.events)
    })
}
