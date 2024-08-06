const mongoose = require('mongoose');
require('dotenv').config();
const mongo_url = process.env.mongo_url;

const connectDB = async() =>{
    try{
        await mongoose.connect(mongo_url);
        console.log("MongoDb connected");
    }catch(error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports= connectDB;