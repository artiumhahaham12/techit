const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    
    try {
        
        let token = req.header("Authorization");
        if (!token) return res.status(400).send("no token");
        token = jwt.verify(token, process.env.JWTKEY);
        req.token = token;
        console.log(1);
        next();
    } catch (error) {
        res.status(400).send(error);
    }
}