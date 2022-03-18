const bcrypt = require('bcrypt');
// const Datastore = require('nedb');
// const users = new Datastore({ filename: 'db/users.db', autoload: true });
const cookie = require('cookie');
const user = require('./database/models/user');
const { mongo } = require('mongoose');

module.exports = {
    signup: (req, res, next) => {
        let email = req.body.email;
        let password = req.body.password;
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let userType = req.body.userType;

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                const newUser = new user({
                    email: email,
                    password: hash,
                    firstName: firstName,
                    lastName: lastName,
                    userType: userType
                })

                newUser.save(function (err, user) {
                    if (err) return res.status(500).json({err});
                    return res.status(200).json({user});
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
 }