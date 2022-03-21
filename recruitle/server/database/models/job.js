const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

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

});

JobSchema.set('timestamps', true);
JobSchema.plugin(uniqueValidator);

module.exports = Job = mongoose.model('Job', JobSchema);