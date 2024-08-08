const mongoose = require('mongoose');
const {Schema } = mongoose;

const userSchema = new Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type: String,
        required : true
    },
    email : {
        type  : String,
        required : true,
        unique : true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String  // URL to profile picture
    }   
});

module.exports = mongoose.model('Users', userSchema)