const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const auth = require("../middlewares/auth");
const Joi = require("joi");

const productSchema = Joi.object({
    name: Joi.string().required().min(2),
    price: Joi.number().required(),
    category: Joi.string().min(2).required(),
    description: Joi.string().required().min(2),
    image: Joi.string().uri(),

    
})

//add to cart
router.post("/", auth, async (req, res) => {
    try {
        const { error } = productSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        console.log(req.token._id);
        
        const cart = await Cart.findOneAndUpdate({ userId: req.token._id }, { $push: { products: req.body } }, { new: true });
        if (!cart) return res.status(404).send("cart not found");
        res.status(200).send(cart);
    } catch (error) {
        res.status(400).send(error)
    }
})
router.get("/products", auth,async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.token._id });
        if (!cart) return res.status(400).send("no cart found");
        res.status(200).send(cart.products)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router;