const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InterviewSchema = new Schema({
    employerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employer',
        required: true
    },
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
    date: {
        type: String,
        required: true
    },
    roomName: {
        type: String,
        required: true
    },
});

module.exports = Interview = mongoose.model('Interview', InterviewSchema);