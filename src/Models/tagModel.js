const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const {Schema} = mongoose;//destructing
// const Schema  =mongoose.Schema;
const TagSchema = new Schema({
    name:{
        type: String,
        required:[true, "Tag name is required"]
    },
   
    time:{
        type:String,
        required:[true, "Time is required"]
    },

   
});

const Tag = mongoose.model("Tag", TagSchema);
module.exports = Tag;