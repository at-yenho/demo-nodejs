const line = require('@line/bot-sdk');
var fs = require("fs");
const request = require('request');

const client = new line.Client({
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || 'myaccesstoken'
});

const processFollow = (event) => {
    const messages = [
        {
            type: "flex",
            altText: "Do you want to answer some question to get recommended Wills",
            contents: {
                type: "bubble",
                header: {
                    type: "box",
                    layout: "vertical",
                    contents: [
                        {
                            type: "text",
                            text: "Do you want to answer some question to get recommended Wills"
                        }
                    ]
                },
                body: {
                    type: "box",
                    layout: "vertical",
                    contents: [
                        {
                            type: "button",
                            action: {
                                type: "postback",
                                label: "Later",
                                data: "{\"action\":\"answer-later\"}",
                                text: "Later"
                            },
                            color: "#0000ff"
                        },
                        {
                            type: "button",
                            action: {
                                type: "postback",
                                label: "Yes",
                                data: "{\"action\":\"start-answer\"}",
                                text: "Yes"
                            },
                            color: "#fe539f"
                        }
                    ]
                }
            }
        }
    ];
    client.replyMessage(event.replyToken, messages)
        .then(() => {
            console.log('Reply messages success: ')
        })
        .catch((err) => {
            console.log('Reply messages errors: ', err)
        });
};

module.exports = (event) => {
    if (event.type === 'follow') {
        return processFollow(event);
    }
};
