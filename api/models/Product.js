const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(

    {
        title: {
            type: String,
            required: true,
        },
        Desc: {
            type: String,
        },

        img: {
            type: String,
            required: true,
        },
        Categories: {
            type: Array,
        },

        Size: {
            type: String,
        },
        Color: {
            type: String,
        },

        Prize: {
            type: Number,
            required: true,
        },
    }, { timestamps: true }
);
module.exports = mongoose.model("Product", ProductSchema);