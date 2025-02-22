const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const register = require("./routes/register")
const login = require("./routes/login")
const users = require("./routes/users")
const products = require("./routes/products")
const carts = require("./routes/carts")

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGODB).then(()=>console.log("server connected to mongo")
).catch;

const logger = (req, res,next) => {
    console.log(req.method, req.url);
    next();
}
app.use(logger);
app.use("/api/register",register);
app.use("/api/login",login);
app.use("/api/users",users);
app.use("/api/products",products);
app.use("/api/carts",carts);
app.listen(port, (req, res) => {
    console.log(`server started on port ${port}`);
    
})

