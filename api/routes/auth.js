module.exports = (router) => {
    var knex = require('knex')(require('../db/conn'));
    var bcrypt = require('bcrypt');
    var rounds = parseInt(process.env.SALT_ROUNDS);

    router.post('/register', (req, res) => {
        if (req.body.password !== req.body.passwordconfirm) {
            res.status(400).send({ error: "Passwords do not match" });
        }
        bcrypt.hash(req.body.password, rounds, (err, hash) => {
            if (err) {
                res.status(400).send({error: "Could not save your user data"})
            }
            knex('users').insert({
                username: req.body.username,
                email:req.body.email,
                password:hash
            }, ['id'])
                .then(id => res.status(200).send(id))
                .catch(err => res.sendStatus(400));
        });       
    });
    
    router.post('/login', (req, res) => {
        knex('users').where({email: req.body.email})
            .then(users => {
                if (users.length == 0) {
                    res.status(400).send({error: "No user exists with that email"});
                }
                res.status(200).send(users[0])
            });
    });
    
    router.post('/logout', (req, res) => {
        res.send('logout');
    });
}