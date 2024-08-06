const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const {Schema} = mongoose;//destructing
// const Schema  =mongoose.Schema;
const ratingSchema = new Schema({
    ratings:{
        type:Number,
        required:[true, "Rating is required"]
    },
   
    description:{
        type:String,
        required:true[true, "Description is required"]
    },
   
});

const Rating = mongoose.model("Rating", ratingSchema);
module.exports = Rating;