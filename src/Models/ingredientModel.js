const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const {Schema} = mongoose;//destructing
// const Schema  =mongoose.Schema;
const ingredientSchema = new Schema({

    recipeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true
    },

    ingredientName:{
        type: String,
        required:[true, "Ingredient name is required"]
    },

    quantity:{
        type:String,
        required:[true, "Quantity is required"]
    },

    
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);
module.exports = Ingredient;