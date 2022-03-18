const bcrypt = require('bcrypt');
// const Datastore = require('nedb');
// const users = new Datastore({ filename: 'db/users.db', autoload: true });
const cookie = require('cookie');
const user = require('./database/models/user');
const { mongo } = require('mongoose');

module.exports = {
    signup: (req, res, next) => {
        let username = req.body.username;
        let password = req.body.password;
    
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                const newUser = new user({
                    username: username,
                    password: hash,
                })
                 newUser.save()
                .then(smth => {
                    res.status(200).json(newUser)
                })
                .catch(error => {
                    console.log(error)
                    return res.status(500).json({error})
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
      res.setHeader('Set-Cookie', cookie.serialize('username', '', {
        path : '/', 
        maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
      }));
      req.session.destroy();
      return res.json("Good");
    },

    addUser: (req, res, next) => {
        const user = new User({
            username: "Hi",
        })
        user.save()
        .then(res.status(200).json(user))
        .catch(error => {
            console.log("hi")
            // res.status(500).json({ error: error });;
        });
    },
 }