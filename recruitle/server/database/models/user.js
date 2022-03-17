const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    // password:{
    //     type: String,
    //     minLength: 8,
    //     required: true
    // },
    // email: {
    //     type: String,
    //     unique: true,
    //     match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    //     required: true
    // },
    // fullName: {
    //     type: String,
    //     required: true
    // },
});

UserSchema.plugin(uniqueValidator);

module.exports = User = mongoose.model('users', UserSchema);