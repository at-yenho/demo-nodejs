const line = require('@line/bot-sdk');
var fs = require("fs");
const request = require('request');
const ms = require('./messages');

const client = new line.Client({
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || 'myaccesstoken'
});

const processImageMessage = (event) => {
    const messageId = event.message.id;
    var now = new Date();
    var fileType = '';
    var fileName = now.getMonth() + '-' + now.getDate() + '-' + now.getFullYear()
        + '-' + now.getHours() + '-' + now.getMinutes() + '-' + now.getSeconds();
    const requestOptions = {
        method: 'GET',
        timeout: 10000,
        headers: {
            Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
        }
    };

    // request.get(`https://api.line.me/v2/bot/message/${messageId}/content`, requestOptions)
    // .on('response', function(res) {
    //     console.log('On response: ', res.headers['content-type']);
    //     fileType = '.' + (res.headers['content-type'].split('/').length === 2 ? res.headers['content-type'].split('/')[1] : 'jpeg');
    // })
    // .pipe(fs.createWriteStream(`images/${fileName}`))
    // .on('finish', function() {
    //     console.log('On end, write success: ', fileName + fileType);
    //     fs.rename(`images/${fileName}`, `images/${fileName + fileType}`, () => {})
    // });
    const messages = [
        {
        type: 'image',
        originalContentUrl: 'https://www.woolha.com/favicon/android-icon-192x192.png',
        previewImageUrl: 'https://www.woolha.com/favicon/android-icon-192x192.png',
        },
    ];
    client.replyMessage(event.replyToken, messages)
    .then(() => {
        console.log('Reply messages success: ')
    })
    .catch((err) => {
        console.log('Reply messages errors: ', err)
    });
};
const processPostbackMessage = (event) => {
    var data;
    try {
        data = JSON.parse(event.postback.data);
    } catch (e) {
    } finally {
        console.log('The data is :', data);
    }
    messages = {
        type: "text",
        text: "You chosen"
    }
    if (data) {
        if (data.action == 'answer-later') {
            messages = {
                type: "text",
                text: "OK! See you later"
            }
        } else if (data.action == 'start-answer') {
            messages = ms.default_messages[1];
        } else if (data.action == 'answer') {
            if (data.messageID  > 2) {
                messages = ms.default_messages[data.messageID + 1];

            } else {
                messages = {
                    type: "text",
                    text: "Your recommended Wills is 'https://link-recommendedwills/shshdsb'"
                }
            }
        }
    }
    client.replyMessage(event.replyToken, messages)
    .then(() => {
        console.log('Reply messages success')
    })
    .catch((err) => {
        console.log('Reply messages errors: ', err)
    });
}
const processTextMessage = (event) => {
    const messages = [
        {
            type: "text",
            text: "You, user"
        },
        {
            type: "text",
            text: "May I help you?"
        }
    ];
    console.log('The message is: ', event.message);
    client.replyMessage(event.replyToken, messages)
    .then(() => {
        console.log('Reply messages success')
    })
    .catch((err) => {
        console.log('Reply messages errors: ', err)
    });
};

module.exports = (event) => {
    if (event.type === 'message') {
        if (event.message.type == 'image') {
           return processImageMessage(event);
        }
        return processTextMessage(event);
    }
    if (event.type === 'postback') {
        return processPostbackMessage(event);
    }
};
