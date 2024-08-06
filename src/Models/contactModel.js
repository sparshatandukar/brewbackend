const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const {Schema} = mongoose;//destructing
// const Schema  =mongoose.Schema;
const contactSchema = new Schema({
    name:{
        type: String,
        required:[true, "Contact name is required"]
    },
   
    email:{
        type:String,
        required:[true, "Email is required"],
        unique:true
    },
   
    message:{
        type:String,
        required:[true, "Message is required"]
    },
   
   
});

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;