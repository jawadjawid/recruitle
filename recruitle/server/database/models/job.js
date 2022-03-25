const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    companyName:{
        type: String,
        required: true
    },
    salary:{
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true
    }
});

JobSchema.set('timestamps', true);

module.exports = Job = mongoose.model('Job', JobSchema);