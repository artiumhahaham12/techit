

const { Schema, model } = require("mongoose");

const cartSchema = Schema({
    userId: {
        type: String,
        required:true
    },
    products: [],
    active:Boolean
})
const Cart = model("carts", cartSchema);

module.exports = Cart;