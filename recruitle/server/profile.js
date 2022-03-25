const Applicant = require('./database/models/applicant');

module.exports = {
    uploadResume: (req, res, next) => {
        let id = req.username;
        let file = req.file;
        if(file == null) {
            return res.end();
        }
        Applicant.updateOne({_id: id}, {$set: {resume: file}}, function(err, raw) {
            //if (err) return res.status(500).end(err);
            console.log(raw)
            return res.json(raw)
        });
    },

    getResume: (req, res, next) => {
        Applicant.findOne({_id: req.params.id}, function(err, app){
            if (err) return res.status(500).end(err);
            if (!app) return res.status(404).end("User with id: " + req.params.id + " does not exist");
            res.setHeader('Content-Type', app.resume.get('mimetype'));
            res.sendFile(app.resume.get('path'), { root: '.' });
        }); 
    },
}