const bcrypt = require('bcrypt');

const Datastore = require('nedb');
const users = new Datastore({ filename: 'db/users.db', autoload: true });
const cookie = require('cookie');

module.exports = {
    signup: (req, res, next) => {
        let username = req.body.username;
        let password = req.body.password;
        users.findOne({_id: username}, function(err, user){
            if (err) return res.status(500).end(err);
            if (user) return res.status(409).end("username " + username + " already exists");
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    users.update({_id: username},{_id: username, password: hash}, {upsert: true}, function(err){
                        if (err) return res.status(500).end(err);
                        return res.json(username);
                    });
                });
            });
        });
      },

      signin: (req, res, next) => {
        var username = req.body.username;
        var password = req.body.password;
        // retrieve user from the database
        users.findOne({_id: username}, function(err, user){
            if (err) return res.status(500).end(err);
            if (!user) return res.status(401).end("access denied");
            bcrypt.compare(password, user.password, function(err, result) {
                if (err) return res.status(500).end("hey boy");
                if (!result) return res.status(401).end("access denied"); 
                req.session.username = username;  
                res.setHeader('Set-Cookie', cookie.serialize('username', username, {
                    path : '/', 
                    maxAge: 60 * 60 * 24 * 7
              }));
              return res.json(username);
            });
        });
    },

    signout: (req, res, next) => {
        console.log("here")
      res.setHeader('Set-Cookie', cookie.serialize('username', '', {
        path : '/', 
        maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
      }));
      req.session.destroy();
      return res.json("Good");
    }
 }