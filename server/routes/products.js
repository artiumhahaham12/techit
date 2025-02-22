const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Product = require("../models/Product");
const Joi = require("joi");


const productSchema = Joi.object({
    name: Joi.string().required().min(2),
    price: Joi.number().required(),
    category: Joi.string().min(2).required(),
    description: Joi.string().required().min(2),
    image: Joi.string().uri(),

    
})
//add product
router.post("/", auth, async (req, res) => {
    try {
        if (!req.token.isAdmin) return res.status(400).send("user not allowed")
        const { error } = productSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);  
        let product = await Product.findOne({ name: req.body.name });
        if (product) return res.status(400).send("user already exists");
        product = new Product(req.body);
        await product.save();

        res.status(200).send(product)

    } catch (error) {
        res.status(400).send(error)
    }
})
//get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        if (!products) return res.status(404).send("no products yet");
        res.status(200).send(products)
    } catch (error) {
        res.status(400).send(error)
    }
})
router.get("/:productId",auth, async (req, res) => {
    try {
        if (!req.token.isAdmin) return res.status(400).send("user not allowed");
            console.log(req.params.productId);
        const product = await Product.findOne({ _id: req.params.productId });
        
        if (!product) return res.status(404).send("product not found");
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send(error)
    }
})
// update product 
router.put("/:productId", auth, async (req, res) => {
    try {
        if (!req.token.isAdmin) return res.status(400).send("user not allowed");
        const { error } = productSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        let product = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
        if (!product) return res.status(400).send("no product found");
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send(error)
    }
})
//delete product
router.delete("/:productId", auth, async (req, res) => {
    try {
        if (!req.token.isAdmin) return res.status(400).send("user not allowed");
        let product = await Product.findByIdAndDelete(req.params.productId);
        if (!product) return res.status(400).send("no product found");
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send(error)
    }
})


module.exports = router;