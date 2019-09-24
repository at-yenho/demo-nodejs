var express = require('express');
var app = express();
var router = express.Router()

middleware = require(__dirname+'/middleware')

router.use(middleware.logTimeAndURLMiddleware)
app.use('/', router)

route = require(__dirname+'/router.js')(app);

server = app.listen(process.env.PORT || 3000, function () {
    console.log("Example app listening on port", process.env.PORT || 3000)
})