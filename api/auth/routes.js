var express = require('express');
var knex = require('../db');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var rounds = parseInt(process.env.SALT_ROUNDS);

var router = express.Router();

router.post('/register', (req, res) => {
  if (req.body.password !== req.body.passwordconfirm) {
    return res.status(400).send({ error: "Passwords do not match" });
  }
  bcrypt.hash(req.body.password, rounds, (err, hash) => {
    if (err) {
      return res.status(400).send({ error: "Could not save your user data" });
    }
    knex('users').insert({
      username: req.body.username,
      email: req.body.email,
      password: hash
    }, ['id'])
      .then(data => {
        jwt.sign({ userId: data[0].id }, process.env.PRIVATE_KEY, (err, token) => {
          return res.json({ token: token });
        });
      })
      .catch(err => res.status(400).json({ error: "Email already exists!" }));
  });
});

router.post('/login', (req, res) => {
  knex('users').where({ email: req.body.email })
    .then(users => {
      if (users.length == 0) {
        return res.status(400).send({ error: "No user exists with that email" });
      }
      bcrypt.compare(req.body.password, users[0].password, (err, matches) => {
        if (!matches) {
          return res.status(400).send({ error: "Incorrect password" });
        }

        jwt.sign({ userId: users[0].id }, process.env.PRIVATE_KEY, (err, token) => {
          res.json({ token: token });
        });
      });
    });
});

router.post('/logout', (req, res) => {
  res.send('logout');
});

module.exports = router;