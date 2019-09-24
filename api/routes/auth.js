module.exports = (router) => {
    var knex = require('knex')(require('../db/conn'));
    var jwt = require('jsonwebtoken');
    var bcrypt = require('bcrypt');
    var rounds = parseInt(process.env.SALT_ROUNDS);

    router.post('/register', (req, res) => {
        if (req.body.password !== req.body.passwordconfirm) {
            res.status(400).send({ error: "Passwords do not match" });
            return;
        }
        bcrypt.hash(req.body.password, rounds, (err, hash) => {
            if (err) {
                res.status(400).send({error: "Could not save your user data"})
                return;
            }
            knex('users').insert({
                username: req.body.username,
                email:req.body.email,
                password:hash
            }, ['id'])
                .then(id => {
                    jwt.sign({userId: id}, process.env.PRIVATE_KEY, null, (err, token) => {
                        res.json({token: token});
                    });
                })
                .catch(err => res.sendStatus(400));
        });       
    });
    
    router.post('/login', (req, res) => {
        knex('users').where({email: req.body.email})
            .then(users => {
                if (users.length == 0) {
                    res.status(400).send({error: "No user exists with that email"});
                }
                bcrypt.compare(req.body.password, users[0].password, (err, matches) => {
                    if (!matches) {
                        res.status(400).send({error: "Incorrect password"});
                        return;                     
                    }
                    jwt.sign({userId: users[0].Id}, process.env.PRIVATE_KEY, null, (err, token) => {
                        res.json({token: token});
                    });                    
                });                
            });
    });
    
    router.post('/logout', (req, res) => {
        res.send('logout');
    });
}