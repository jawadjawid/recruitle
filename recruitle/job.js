const applicant = require('./database/models/applicant');
const employer = require('./database/models/employer');
const job = require('./database/models/job')
const application = require('./database/models/application');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

module.exports = {
    apply: (req, res, next) => {
        let jobId = req.body.jobId;
        let applicantId = req.username;
        applicant.findOne({_id: applicantId}, function(err, applicant){
            if (err) return res.status(500).end(err);
            if (!applicant) return res.status(404).end("User with id: " + applicantId + " does not exist");
            job.findOne({_id: jobId}, function(err, job) {
                if (err) return res.status(500).end(err);
                if (!job) return res.status(404).end("Job with id: " + jobId + " does not exist");
                employer.findOne({companyName: job.companyName}, function(err, employer) {
                    if (err) return res.status(500).end(err);
                    if (!employer) return res.status(404).end("Employer with name: " + job.companyName + " does not exist");

                    let applicationDoc = new Application({
                        jobId: mongoose.Types.ObjectId(job._id),
                        applicantId: mongoose.Types.ObjectId(applicant._id)
                    });
                    applicationDoc.save();

                    let mailTransporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: (process.env.EMAIL_USER && {user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASSWORD}) || require('./config.js').auth
                    });

                    let mailOptions = {
                        from: process.env.EMAIL_USER || require('./config.js').auth.user,
                        to: employer.email,
                        subject: 'Job Application - ' + job.title,
                        text: 'You have recieved an application from ' + applicant.firstName + ' ' + applicant.lastName,
                        attachments: [{
                            filename: applicant.resume.get("originalname"),
                            path: applicant.resume.get("path"),
                            contentType: applicant.resume.get("mimetype")
                        }]
                    };

                    mailTransporter.sendMail(mailOptions, function(err, data) {
                        if(err) {
                            console.log('Error Occured!');
                            console.log(err);
                        } else {
                            console.log('Email sent successfully.');
                        }
                    });

                    res.status(200).json({message: "Successfully applied."});
                });
            })
        }); 
    }
}