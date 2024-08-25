const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const {Schema} = mongoose;//destructing
// const Schema  =mongoose.Schema;
const CategorySchema = new Schema({
    name:{
        type: String,
        required: [true, "Category name is required"]
    },
   
    types:{
        type:String,
        required: [true, "Category types is required"],   
    },

   
});

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;