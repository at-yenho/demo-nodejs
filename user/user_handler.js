// app-root-path is dir contain node-modules
var appRoot = require('app-root-path');
var fs = require("fs");
var jwt = require('jsonwebtoken');
config_app = require(appRoot+ "/config.json")
module.exports = {
    "getAllUsers": (req, res) => {
        readerStream = fs.createReadStream(appRoot + "/users.json")
        readerStream.setEncoding('UTF8');
        readerStream.pipe(res)
        readerStream.on('error', function(err) {
            console.log(err)
            res.status(500).send('Something broke!');
        });
    },

    "getUser": (req, res) => {
        dataJSONStr = '';
        readerStream = fs.createReadStream(appRoot + "/users.json")
        readerStream.setEncoding('UTF8');
        readerStream.on('data', (chunk) => {
            dataJSONStr += chunk;
        });

        readerStream.on('end', () => {
            dataJSON = JSON.parse(dataJSONStr)
            user = dataJSON.find((element) => {
                return element.id == req.params.id
            })
            if (user == null) {
                res.sendStatus(404);
                return
            }
            res.end(JSON.stringify(req.user));        
        });

        readerStream.on('error', (err) => {
            console.log(err)
            res.status(500).send('Something broke!');
        });
    },

    "deleteUser": (req, res) => {
        readerStream = fs.createReadStream(appRoot + "/users.json")
        readerStream.setEncoding('UTF8');
        dataJSONStr = '';
        readerStream.on('data', (chunk) => {
            dataJSONStr += chunk;
        });

        readerStream.on('end', () => {
            dataJSON = JSON.parse(dataJSONStr)
            data = dataJSON.filter((item) => {
                return item.id != req.params.id;
            });
            console.log(data.length ,dataJSON)
            if (data.length == dataJSON.length) {
                res.sendStatus(404);
                return
            }
            fs.writeFile(appRoot + "/users.json", JSON.stringify(data, null, 4), function(){})

            console.log(data)
            res.end("Delete successful!");
        });

        readerStream.on('error', (err) => {
            console.log(err)
            res.status(500).send('Something broke!');
        });
    },

    "login": (req, res) => {
        console.log(req.body)
        dataJSONStr = '';
        readerStream = fs.createReadStream(appRoot + "/users.json")
        readerStream.setEncoding('UTF8');
        readerStream.on('data', (chunk) => {
            dataJSONStr += chunk;
        });

        readerStream.on('end', () => {
            dataJSON = JSON.parse(dataJSONStr)
            user = dataJSON.find((element) => {
                return element.name == req.body.name && element.password == req.body.password
            })
            if (user == null) {
                res.status(400).send("Username or password is incorrect");
                return
            }
            token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: {"id": user.id}
                },
                config_app.jwt.private_key);
            res.end(JSON.stringify({"token": token}));
        });

        readerStream.on('error', (err) => {
            console.log(err)
            res.status(500).send('Something broke!');
        });
    },
    "profile": (req, res) => {
        res.end(JSON.stringify(req.user));        
    }
}
