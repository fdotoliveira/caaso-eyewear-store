const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
    },
    image1: {
        type: String,
        required: true,
        trim: true
    },
    image2: {
        type: String,
        required: true,
        trim: true
    },
    image3: {
        type: String,
        required: true,
        trim: true
    },
    image4: {
        type: String,
        required: true,
        trim: true
    }
    // image: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'Image'
    // }]
})

module.exports = mongoose.model('Product', ProductSchema)