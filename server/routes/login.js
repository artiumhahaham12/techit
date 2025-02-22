const express = require("express");
const Joi = require("joi");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const loginSchema = Joi.object({
    email: Joi.string().required().min(2).email(),
    password: Joi.string().min(8).required(),
})

router.post("/", async (req, res) => {
    try { 
        const { error } = loginSchema.validate(req.body);
        if (error) return res.status(400).send(error);
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("imail or password are incorrect");
        result = bcrypt.compare(req.body.password, user.password);
        if (!result) return res.status(400).send("imail or password are incorrect");
        const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin },process.env.JWTKEY);
        res.status(200).send(token);
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router;