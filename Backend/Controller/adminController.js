const userModel = require("../model/userModel");
const { ObjectId } = require("mongoose").Types;

const adminId = {
    email:process.env.ADMIN_EMAIL,
    password:process.env.ADMIN_PASSWORD,
};


const getLogin = async(req,res)=>{

    res.status(200).json({"mission":"success","message":"admin dashboard successful"});
    return
};

const postLogin=(req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        res.status(400).json({"mission":"failed","message":"one of the Credential is null"});
        return;
    }

    if(email !== adminId.email){
        res.status(409).json({"mission":"failed","message":"Email is not valid"});
        return;
    }

    if(password !== adminId.password){
        res.status(409).json({"mission":"failed","message":"Password is not valid"});
        return;
    }

    res.status(200).json({"mission":"success","message":"admin successfully log-in",admin:adminId.email});
    return;
};

const getDashBoard=async(req,res)=>{
    const users = await userModel.find();

    if(users.length <= 0){
        res.status(404).json({"mission":"success","message":"No users in the database"});
        return;
    }

    res.status(200).json({"mission":"success","message":"admin login successful","users":users});
    return
};

const postDashBoard = async(req,res)=>{
    try{
        const users = await userModel.find();

        if(users.length <= 0){
            res.status(409).json({"mission":"success","message":"Not found users"});
            return;
        }

        res.status(200).json({"mission":"success","message":"user fetch successfully","users":users});
        return;
    }

    catch(err){
        res.status(500).json({"mission":"failed","message":"Server error","error":err.message});
        return;
    }
};

// const edit = async(req,res)=>{
//     try {
//             const {id,email,name,password} = req.body;
//             console.log(req.body);
            
//             if(!id){
//                 res.status(400).json({"mission":"failed","message":"Passed email is null"});
//                 return;
//             }

//             const user = await userModel.findOne({ _id: new ObjectId(id) });


//             if(!user){
//                 res.status(404).json({"mission":"failed","message":"User not in DB"});
//                 return;
//             }

//             const updateTheUser =  await userModel.findOneAndUpdate({_id: new ObjectId(id) },{
//                 $set :{
//                     name:name,
//                     email:email,
//                     password:password,
//                     image:{
//                         data:req.file.filename,
//                         contentType:"image/png"
//                         }
//                 }},
//                 { new:true, runValidators:true });

//             if(!updateTheUser){
//                 res.status(200).json({"mission":"failed","message":"no edit is done"});
//                 return;
//             }

//             res.status(200).json({"mission":"success","message":"user Edited successfully",});
//             return;

//         } catch(err){
//             res.status(500).json({"mission":"failed","message":"server error",error:err.message});
//             return;
//         }
// };


const edit = async (req, res) => {
  try {
    const { id, email, name, password } = req.body;
    console.log(req.body);

    if (!id) {
      res.status(400).json({ mission: "failed", message: "Passed id is null" });
      return;
    }

    const user = await userModel.findOne({ _id: new ObjectId(id) });

    if (!user) {
      res.status(404).json({ mission: "failed", message: "User not in DB" });
      return;
    }

    // Prepare update object
    const updateFields = {
      ...(name && { name }),
      ...(email && { email }),
      ...(password && { password }),
    };

    if (req.file) {
      updateFields.image = {
        data: req.file.filename,
        contentType: "image/png",
      };
    }

    const updateTheUser = await userModel.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updateTheUser) {
      res.status(200).json({ mission: "failed", message: "No edit is done" });
      return;
    }

    res.status(200).json({ mission: "success", message: "User edited successfully" });
  } catch (err) {
    res.status(500).json({ mission: "failed", message: "Server error", error: err.message });
  }
};

const addNewUser=async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        const image = req.file.filename;
        console.log(req.file.filename);
        
        if(!email || !name || !password) {
            res.status(400).json({"mission":"failed","message":"One of the Credential is null",});
            return;
        }
        
        if(!req.file || !req.file.filename){
            res.status(400).json({"mission":"failed","message":"Image is null",});
            return;
        }

        const newUseraddIntoDB = new userModel({
                        name:name,
                        email:email,
                        password:password,
                        image:{
                            data: req.file.filename,
                            contentType:"image/png"
                        }
                    });

        await newUseraddIntoDB.save();

        res.status(200).json({"mission":"success","message":"new User Added  successfully",});
        return;

} catch(err){
    res.status(500).json({"mission":"failed","message":"server error",error:err.message});
    return;
}
};

const clearDB = async (req, res) => {
    try {
        const totalDocs = await userModel.countDocuments();

        if(totalDocs == 0){

            res.json({
                "mission": "failed",
                "message": "DATABASE is empty",
            });
            return;
        }

        let docs = await userModel.deleteMany();


        if (docs.deletedCount !== totalDocs) {
            return res.json({
                "mission": "failed",
                "message": "Not all users were deleted",
                deleted: docs.deletedCount,
                totalDocs: totalDocs
            });
        }

        return res.json({
            "mission": "success",
            "message": "Users deleted successfully"
        });

    } catch (err) {
        if (req.file) {
            console.log(req.file.filename);
        }

        return res.status(500).json({
            "mission": "failed",
            "message": "server error",
            "error": err.message
        });
    }
};


const deleteAUser = async(req,res)=>{
    try{
        console.log(req.body);
        const {email} = req.params ;
        console.log(email);
        if(!email){
            res.status(400).json({"mission":"failed","message":"Email is null",});
            return;
        }

        const user = await userModel.findOne({email});
        if(!user) {
            res.status(404).json({"mission":"failed","message":"User not found",});
            return;
        }

        //delete user:
        await userModel.deleteOne({email});
        res.status(200).json({"mission":"success","message":"user deleted successfully",});
        return;

    } catch(err){
        res.status(500).json({"mission":"failed","message":"Server Error",error:err.message});
        return;
    }

}

module.exports = { 
    getLogin, 
    postLogin, 
    getDashBoard, 
    postDashBoard, 
    edit, 
    addNewUser,
    clearDB,
    deleteAUser 
};




