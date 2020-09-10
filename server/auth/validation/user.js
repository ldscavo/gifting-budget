module.exports = async (req, res, next) => {
  var jwt = require('jsonwebtoken');
  var knex = require('../../db');

  var header = req.get('Authorization') || '';

  var token = header.split('Bearer ');
  if (token.length < 2) {
    return res.sendStatus(401);
  }

  jwt.verify(token[1], process.env.PRIVATE_KEY, async (err, decoded) => {
    if (err) {
      return res.sendStatus(401);
    }
    
    req.userId = decoded.userId;
    
    let savedTokens = await knex('users')
      .where({
        id: req.userId,
        api_key: token[1]
      });
    
    if (savedTokens.length == 0) {
      return res.sendStatus(401);
    }

    return next();
  });
}