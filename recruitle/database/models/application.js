const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
    applicantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Applicant',
        required: true
    },
    jobId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
});

ApplicationSchema.set('timestamps', true);

module.exports = Application = mongoose.model('Application', ApplicationSchema);