const express = require("express");
const Joi = require("joi");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");


router.get("/profile",auth,async (req, res) => {
    try {
        
        
        let user = await User.findById(req.token._id);
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;
