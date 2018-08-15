const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../modules/User');
const keys = require('../config/keys');

module.exports.login = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email});

    if (candidate){
        // check password
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if(passwordResult){
        // Generate token
        const token = jwt.sign({
           email: candidate.email,
           userId: candidate._id
        },keys.jwt, {expiresIn: 60*60});

        res.status(200).json({
            token: `Bearer ${token}`
        })
        }else {
            // passwords was different
            res.status(401).json({
                message: 'Password is invalid.'
            })
        }
    }else {
        // error, there is no user
        res.status(404).json({
            message: 'User with such email does not exist.'
        })
    }
};

module.exports.register = async function(req, res) {

    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {
        // User exists, bring error about it
        res.status(409).json({
            message: 'This email already registered. Try another one.'
        })
    }else {
        // Create account
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;

        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });
        try{
            await user.save();
            res.status(201).json(user)
        }catch (e) {
            //
        }
    }
};