const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const {Schema} = mongoose;//destructing
// const Schema  =mongoose.Schema;
const ingredientSchema = new Schema({
    ingredientName:{
        type: String,
        required:[true, "Ingredient name is required"]
    },
   
    description:{
        type:String,
        required:[true, "Description is required"]
    },

    quantity:{
        type:Number,
        required:[true, "Quantity is required"]
    }
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);
module.exports = Ingredient;