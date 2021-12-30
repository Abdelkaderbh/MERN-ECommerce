const express = require('express');
const router = express.Router();
const User = require("../models/User.js");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");


//Register
router.post("/register", async(req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)

    } catch (err) {
        res.status(500).json(err);
    }
});

//Login
router.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(401).json("Wrong Credentials");
        const hashPassword = CryptoJs.AES.decrypt(user.password, process.env.PASS_SEC);
        const Originpassword = hashPassword.toString(CryptoJs.enc.Utf8);
        Originpassword != req.body.password && res.status(401).json("Wrong Credentials");
        const accessToken = jwt.sign({
                id: user.id,
                isAdmin: user.isAdmin,

            }, process.env.JWT_SEC, { expiresIn: "3d" }

        )
        const { password, ...others } = user._doc;
        res.status(200).json({
            ...others,
            accessToken
        });
    } catch (err) {
        res.status(500).json(err);
    }

})






module.exports = router