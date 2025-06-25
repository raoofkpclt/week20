const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type : String,
        required:true
    },
    password:{
        type:String,
        required: true
    },
    image:{
        data :Buffer,
        contentType: String,
    }
});

const modal = mongoose.model("users",schema);

module.exports = modal;
