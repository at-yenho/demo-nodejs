export const default_messages = {
    1: {
        type: "flex",
        altText: "Your gender?",
        contents: {
            type: "bubble",
            body: {
                type: "box",
                layout: "vertical",
                contents: [
                    {
                        type: "button",
                        action: {
                            type: "postback",
                            label: "Male",
                            data: "{\"action\":\"answer\", \"messageID\": 1}",
                            text: "Male"
                        },
                        color: "#0000ff"
                    },
                    {
                        type: "button",
                        action: {
                            type: "postback",
                            label: "Female",
                            data: "{\"action\":\"answer\", \"messageID\": 1}",
                            text: "Female"
                        },
                        color: "#fe539f"
                    }
                ]
            }
        }
    },
    2: {
        type: "flex",
        altText: "Where do you live?",
        contents: {
            type: "bubble",
            body: {
                type: "box",
                layout: "vertical",
                contents: [
                    {
                        type: "button",
                        action: {
                            type: "postback",
                            label: "Japan",
                            data: "{\"action\":\"answer\", \"messageID\": 2}",
                            text: "Japan"
                        },
                        color: "#0000ff"
                    },
                    {
                        type: "button",
                        action: {
                            type: "postback",
                            label: "Other",
                            data: "{\"action\":\"answer\", \"messageID\": 2}",
                            text: "Other"
                        },
                        color: "#fe539f"
                    }
                ]
            }
        }
    }
}
