const express = require('express');
const app = express();
const morgan = require('morgan');
const { MongoClient } = require("mongodb");
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users')

//Connecting to the database.
mongoose.connect('mongodb+srv://NigelRichards:' + process.env.MONGO_ATLAS_PW + '@noderestshop.u1pmu.mongodb.net/db1?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;

app.use(morgan("dev"));

//Uploads are visable to anyone
app.use('/uploads', express.static('uploads'));

//Allows URLs and JSON data
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Handles CORS errors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Autorization");

    if(req.Method === "OPTIONS"){
        res.header("Access-Allow-Control-Methods", "Get, Post, Put, Patch, Delete");
        return res.status(200).json({})
    }
    next();
})

//Available routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);

//Error handling if no valid route
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
})

module.exports = app;