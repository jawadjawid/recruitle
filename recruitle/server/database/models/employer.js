const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const EmployerSchema = new Schema({
    email: {
        type: String,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    companyName:{
        type: String,
        required: true,
        unique: true,
    },
});

EmployerSchema.plugin(uniqueValidator);

module.exports = Employer = mongoose.model('Employer', EmployerSchema);