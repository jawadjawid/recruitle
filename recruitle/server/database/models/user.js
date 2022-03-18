const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    password:{
        type: String,
        minLength: 8,
        required: true
    },
    email:{
        type: String,
        minLength: 8,
        required: false,
    },
});

// UserSchema.plugin(uniqueValidator);

module.exports = User = mongoose.model('users', UserSchema);