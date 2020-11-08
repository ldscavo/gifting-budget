module.exports = async (req, res, next) => {
  var jwt = require('jsonwebtoken');
  var knex = require('../../db');
  var util = require('../util');

  let token = util.getToken(req);

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.PRIVATE_KEY, async (err, decoded) => {
    if (err) {
      return res.sendStatus(401);
    }
    
    req.userId = decoded.userId;
    
    let savedTokens = await knex('apiKeys')
      .where({
        userId: req.userId,
        api_key: token
      });
    
    return savedTokens.length == 0
      ? res.sendStatus(401)
      : next();    
  });
}