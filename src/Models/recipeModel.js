const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const {Schema} = mongoose;//destructing
// const Schema  =mongoose.Schema;
const RecipeSchema = new Schema({

    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
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
        required:true
    },

    direction:{
        type:String,
        required:[true, "Direction is required"]
    },
    recipeImage:{
        type:String
    }
   
});

const Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;