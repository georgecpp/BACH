const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');

const createAndAssignJWT = (user, res) => {
    // Create and assign JWT for this session
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, {expiresIn:'30d'});
    res.status(200).header('auth-token-bach', token).send(
        {
            id: user._id,
            jwt: token,
            email: user.email,
            name: user.name,
            img: user.img,
            team: user.team,
            role: user.role,
            actualBMI: user.actualBMI,
            heartRate: user.heartRate,
            saturation: user.saturation,
            temperature: user.temperature,
            steps: user.steps,
            sleepQuality: user.sleepQuality
        });
}
const registerUser = async(req, res) => {

    // create a new user.
    const user = new User({
        email: req.body.email,
        name: req.body.name,
        img: req.body.img,
        team: req.body.team,
        role: req.body.role,
        actualBMI: req.body.actualBMI,
        heartRate: req.body.heartRate,
        saturation: req.body.saturation,
        temperature: req.body.temperature,
        steps: req.body.steps,
        sleepQuality: req.body.sleepQuality
    });

    try {
        const savedUser = await user.save();
        createAndAssignJWT(savedUser, res);
    }
    catch(err) {
        res.status(400).send(err);
    }
}

router.post('/social-auth', async(req, res) => {

    // check if email exists in the database -- that means user already signed up with facebook
    const user = await User.findOne({email: req.body.email});

    // if not, register user.
    if(!user) {
        registerUser(req, res);
        return;
    }

    // social media picture may differ from login to login.
    // so update it.
    await User.updateOne({_id: user._id}, {
        img: req.body.img
    });

    // create and assign JWT for this session.
    createAndAssignJWT(user, res);
});

module.exports = router;