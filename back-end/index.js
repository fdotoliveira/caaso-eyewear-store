const express = require('express');
const uri = "mongodb+srv://matheusgiraldi:trabweb12@caaso-eyewear.raahbz5.mongodb.net/?retryWrites=true&w=majority";
const mongoose = require('mongoose');
const cors = require('cors')
const userRoutes = require('./routes/User.js')
const productRoutes = require('./routes/Product.js')
const User = require('./models/User');
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/public/productImages", express.static("./public/productImages"));
app.use(require("./routes/User"));
app.use(require("./routes/Image"));
app.use(require("./routes/Product"));


mongoose.connect(uri)
    .then(() => {
        app.listen(3001), console.log('Connected')
    })
    .catch((err) => { console.log(err) })