const User = require('../Models/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        if (!email || !password) {
            return res.status(400).json({ error: 'Please provide an email and password' });
        }

        const user = await User.findOne({
            where: {
                email: email
            }
        });

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const poyload = {
            user: {
                id: user.id,
                email : user.email,
                username : user.username
            }
        };

        const token = jwt.sign({ poyload } , process.env.SECRET_JWT, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.log(error.message);
    }
};

const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Please provide an email, username and password'});
    }
        try {
            const userExist = await User.findOne({
                where: {
                    email: email

                }
            });

            if (userExist) {
                return res.status(400).json({error: "User already exist"});
            }

            const salt = await bcrypt.genSalt(10);

            const hashPassword = await bcrypt.hash(password, salt);
            const user = await User.create({
                username,
                email,
                password : hashPassword
            })

            return res.status(201).json({ user });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ error: 'Server error' });
        }
}

module.exports = { login, register };