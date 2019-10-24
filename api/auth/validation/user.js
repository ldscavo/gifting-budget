module.exports = (req, res, next) => {
    var jwt = require('jsonwebtoken');
    var header = req.get('Authorization') || '';

    var token = header.split('Bearer ');
    if (token.length < 2) {
        return res.sendStatus(401);
    }
    
    jwt.verify(token[1], process.env.PRIVATE_KEY, (err, decoded) => {
        if (err) {
            return res.sendStatus(401);
        }

        req.userId = decoded.userId;
        return next();
    });
}