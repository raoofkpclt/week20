const mongoose = require("mongoose");

const ConnectDB = async()=>{
    try{
        const mongoConnection = await mongoose.connect("mongodb://localhost:27017/week20" ,{} );
        console.log("mongodb",mongoConnection.connection.host);
    }catch(err){
        console.log("Error-Connecting-Database");
        throw new Error(err.message);
    }
}

module.exports = ConnectDB;