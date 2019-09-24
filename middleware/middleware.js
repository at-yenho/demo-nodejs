module.exports.logTimeAndURLMiddleware = (req, res, next) => {
    console.log('Request URL:',req.method, " ", req.originalUrl, " Time Access: ", new Date().toISOString())
    next()
}
