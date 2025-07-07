const bcrypt = require('bcryptjs');
const { User, validate } = require('../models/user')
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { error } = validate(req.body)
        if (error) {
            const msg = error.details[0].message.includes('password')
                ? 'Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.'
                : error.details[0].message;
            return res.status(400).send(msg);
        }
        const { First_Name, Last_Name, email, password } = req.body;
        let existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).send('User with this email already exists.');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            First_Name,
            Last_Name,
            email,
            password: hashedPassword
        })
        const token = newUser.generateAuthToken();
        res.header('Authorization',token).status(201).json({
            message: 'Signup successful',
            user: {
                id: newUser._id,
                First_Name: newUser.First_Name,
                Last_Name: newUser.Last_Name,
                email: newUser.email
            },
            token
        });
    } catch (error) {
        console.error("Registration error:", error.message);
        res.status(500).send('Something went wrong. Please try again later.');
    }
}


module.exports = signup