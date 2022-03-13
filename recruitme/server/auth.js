const bcrypt = require('bcrypt');

const Datastore = require('nedb');
const users = new Datastore({ filename: 'db/users.db', autoload: true });

module.exports = {
    signup: (req, res, next) => {
        let username = req.body.username;
        let password = req.body.password;
        users.findOne({_id: username}, function(err, user){
            if (err) return res.status(500).end(err);
            if (user) return res.status(409).end("username " + username + " already exists");
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    users.update({_id: username},{_id: username, hash: hash}, {upsert: true}, function(err){
                        if (err) return res.status(500).end(err);
                        return res.json(username);
                    });
                });
            });
        });
      },
 }