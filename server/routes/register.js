const express = require("express");
const Joi = require("joi");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Cart = require("../models/Cart")



const registerSchema = Joi.object({
    name: Joi.string().required().min(2),
    email: Joi.string().required().min(2).email(),
    password: Joi.string().min(8).required(),
    isAdmin:Joi.bool().required()
})

router.post("/", async (req, res) => {
    try {
        
        const { error } = registerSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send("user alredy exists");
        console.log("user");
        user = new User(req.body);
        const cart= new Cart({
            userId: user._id,
            products: [],
            active:user.isAdmin
        })
        const salt = await bcrypt.genSalt(14);
        user.password = await bcrypt.hash(user.password, salt);
        await cart.save()
        await user.save();
        const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin },process.env.JWTKEY);
        res.status(201).send(token);

    } catch (error) { 
        res.status(400).send(error);
    }
})

module.exports = router;