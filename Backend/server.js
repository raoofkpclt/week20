const express =  require("express");
const mongoDB = require("./DB/mongoDb");
const nocache = require("nocache");
const app = express();
const port = process.env.PORT || 3033;
const path = require("path");

const userRouter = require("./Router/userRouter");
const adminRouter = require("./Router/adminRouter");

const cors = require("cors");
app.use(cors({origin:"*",allowedHeaders:"Authorization,Content-Type",credentials:true}));

app.use(nocache()); 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/uploads",express.static("uploads"));

app.use("/uploads",express.static(path.join(__dirname,"uploads")));
app.use("/user",userRouter);
app.use("/admin",adminRouter);


app.get("/*",(req,res)=>{
    console.log("User on unknown route")
    res.status(404).json({"message":"Page-not-found","route":"unknown Route"});
    return;
})

mongoDB()//DATABASE PORT:

app.listen(port,()=>{
    console.log("http://localhost:3033");
})