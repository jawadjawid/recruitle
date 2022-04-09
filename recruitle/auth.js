const bcrypt = require('bcryptjs');
const cookie = require('cookie');
const applicant = require('./database/models/applicant');
const employer = require('./database/models/employer');

function resolveSignupError(error){
    if (!error.errors)
        return "Error signing up"
    errors = error.errors

    if(errors.firstName)
        return errors.firstName.message;
    else if(errors.lastName)
        return errors.lastName.message;
    else if(errors.password)
        return errors.password.message;
    else if(errors.email)
        return errors.email.message;
    else if(errors.companyName){
        return errors.companyName.message;
    }
}

const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*.()-+?><])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

module.exports = {
    signup: (req, res, next) => {
        let email = req.body.email;
        let password = req.body.password;
        if(!passwordRegex.test(password))
            return res.status(500).end("Password must be of at least legth 8, and should contain a special symbol, upper and lower case letters and a number");

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                if(req.body.userType == "applicant"){
                    let firstName = req.body.firstName;
                    let lastName = req.body.lastName;

                    const newApplicant = new applicant({
                        email: email,
                        password: hash,
                        firstName: firstName,
                        lastName: lastName,
                        resume: {"originalname": "No resume on file!"}
                    })
    
                    newApplicant.save(function (err, user) {
                        if (err) {
                            resolvedMsg = resolveSignupError(err);
                            err = resolvedMsg.includes("Path") ? resolvedMsg.split("Path")[1] : resolvedMsg;
                            return res.status(500).end(err);
                        };
                        return res.status(200).json({user});
                    });            
                } else if (req.body.userType == "employer") {
                    let companyName = req.body.companyName;

                    const newEmployer = new employer({
                        email: email,
                        password: hash,
                        companyName: companyName
                    })
    
                    newEmployer.save(function (err, employer) {
                        if (err) {
                            resolvedMsg = resolveSignupError(err);
                            err = resolvedMsg.includes("Path") ? resolvedMsg.split("Path")[1] : resolvedMsg;
                            return res.status(500).end(err);
                        };
                        return res.status(200).json({employer});
                    }); 
                }
            });
        });
    },

    signin: (req, res, next) => {
        var email = req.body.email;
        var password = req.body.password;
        applicant.findOne({email: email}, function(err, user){
            if (err) return res.status(500).end(err);
            if (!user) {
                employer.findOne({email: email}, function(err, user){
                    if (err) return res.status(500).end(err);
                    if (!user) {
                        return res.status(401).end("access denied");
                    }
                    bcrypt.compare(password, user.password, function(err, result) {
                        if (err) return res.status(500).end("error");
                        if (!result) return res.status(401).end("access denied"); 
                        req.session.username = user.id; 
                        req.session.userType = 'employer'
                        res.setHeader('Set-Cookie', [cookie.serialize('username', user.id, {
                            path : '/', 
                            maxAge: 60 * 60 * 24 * 7,
                            secure: true,
                            sameSite: true,
                        }), cookie.serialize('userType', 'employer', {
                            path : '/', 
                            maxAge: 60 * 60 * 24 * 7,
                            secure: true,
                            sameSite: true,
                        })]);
                        return res.json(user);
                    })
                });
            }else{
                bcrypt.compare(password, user.password, function(err, result) {
                    if (err) return res.status(500).end("error");
                    if (!result) return res.status(401).end("access denied"); 
                    req.session.username = user._id;
                    req.session.userType = 'applicant'  
                    res.setHeader('Set-Cookie', [cookie.serialize('username', user.id, {
                        path : '/', 
                        maxAge: 60 * 60 * 24 * 7,
                        secure: true,
                        sameSite: true,
                    }), cookie.serialize('userType', 'applicant', {
                        path : '/', 
                        maxAge: 60 * 60 * 24 * 7,
                        secure: true,
                        sameSite: true,
                    })]);
                    return res.json(user);
                })
            }           
        });
    },

    signout: (req, res, next) => {
      res.setHeader('Set-Cookie', [cookie.serialize('username', '', {
        path : '/', 
        maxAge: 60 * 60 * 24 * 7,
        secure: true,
        sameSite: true,
      }), cookie.serialize('userType', '', {
        path : '/', 
        maxAge: 60 * 60 * 24 * 7,
        secure: true,
        sameSite: true,
      })]);
      req.session.destroy();
      return res.json("Good");
    },
 }
