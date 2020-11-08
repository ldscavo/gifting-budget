var express = require('express');
var knex = require('../db');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var util = require('../auth/util');

var rounds = parseInt(process.env.SALT_ROUNDS);

var router = express.Router();

router.post('/register', async (req, res) => {
  if (req.body.password !== req.body.passwordconfirm) {
    return res.status(400).send({ error: "Passwords do not match" });
  }
  
  let hash = await bcrypt.hash(req.body.password, rounds);
  
  try {
    let data = await knex('users').insert({
      username: req.body.email,
      email: req.body.email,
      password: hash
    }, ['id']);

    return await apiToken(res, data[0].id);
  }
  catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Email already exists!" })
  }  
});

router.post('/login', async (req, res) => {
  let users = await knex('users').where({ email: req.body.email });
    
  if (users.length == 0) {
    return res.status(400).send({ error: "No user exists with that email" });
  }

  let match = await bcrypt.compare(req.body.password, users[0].password);
  
  if (!match) {
    return res.status(400).send({ error: "Incorrect password" });
  }

  return await apiToken(res, users[0].id);  
});

router.post('/logout', async (req, res) => {
  var jwt = require('jsonwebtoken');

  let token = util.getToken(req);

  let decoded = jwt.verify(token, process.env.PRIVATE_KEY);

  if (!decoded) {
    return res.sendStatus(401);
  }

  await knex('apiKeys')
    .where({ userId: decoded.userId, api_key: token })
    .del();

  return res.json({text:"Successfully logged out"});
});

apiToken = async (res, userId) =>
  jwt.sign({ userId: userId }, process.env.PRIVATE_KEY, async (err, token) => {
    await knex('apiKeys').insert({userId, api_key: token});

    return res.json({ token: token });
  });

module.exports = router;