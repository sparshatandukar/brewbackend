const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const {Schema} = mongoose;//destructing
// const Schema  =mongoose.Schema;
const RecipeSchema = new Schema({
    recipeName:{
        type: String,
        required:[true, " name is required"]
    },
   
    description:{
        type:String,
        required:[true, "Description is required"]
    },

    prep_time:{
        type:Number,
        required:true
    },
    difficulty:{
        type:String, 
        enum:["easy", "intermediate", "advanced"],
        // default:"user",
        required:true
    },
   
});

const Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;