
const { Schema, model } = require("mongoose");

const productsSchema = Schema({
    name: {
        type: String,
        required:true,
        minlength:2
    },
    price: {
        type: Number,
        required:true,
    },
    category: {
        type: String,
        required:true,
        minlength:2
    },
    description: {
        type: String,
        minlength:2
    },
    image: {
        type: String,
        default:"https://th.bing.com/th/id/R.3e77a1db6bb25f0feb27c95e05a7bc57?rik=2%2bEacMcroPV4ow&pid=ImgRaw&r=0"
    }
})
const Product = model("products", productsSchema);

module.exports = Product;