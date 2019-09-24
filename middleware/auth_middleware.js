var appRoot = require('app-root-path');
var fs = require("fs");
config_app = require(appRoot+ "/config.json")
var jwt = require('jsonwebtoken');

module.exports.isAuthorized  = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token) {
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
        jwt.verify(token, config_app.jwt.private_key, (err, decoded) => {
        if (err) {
            return res.json({
            success: false,
            message: 'Token is not valid'
            });
        } else {
            console.log(decoded)
            dataJSONStr = '';
            readerStream = fs.createReadStream(appRoot + "/users.json")
            readerStream.setEncoding('UTF8');
            readerStream.on('data', function(chunk) {
                dataJSONStr += chunk;
            });

            readerStream.on('end',function() {
                dataJSON = JSON.parse(dataJSONStr)
                user = dataJSON.find(function(element) {
                    return element.id == decoded.data.id
                })
                if (user == null) {
                    res.status(400).send("Unauthorization!");
                    return
                }
                req.user = user
                next();

            });

            readerStream.on('error', function(err) {
                console.log(err)
                res.status(500).send('Something broke!');
            });
        }
        });
    } else {
        return res.json({
        success: false,
        message: 'Auth token is not supplied'
        });
    }
}
