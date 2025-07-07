const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const passwordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
    First_Name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    Last_Name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    }

})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY)
    return token
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const complexityOptions = {
        min: 8,
        max: 30,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 4
    };



    const schema = Joi.object({
        First_Name: Joi.string().min(2).max(50).required(),
        Last_Name: Joi.string().min(1).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: passwordComplexity(complexityOptions).required()
    });

    return schema.validate(user);
}



exports.User = User;
exports.validate = validateUser;