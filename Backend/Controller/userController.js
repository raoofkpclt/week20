const userModel = require("../model/userModel");
const upload = require("../Multer/multerImage");
const HttpStatusCode = require("../Config/HttpStatusCodes");
const bcrypt = require("bcrypt");
const generateToken =  require("../Config/jwt");

const getRegister=(req, res) => {
    res.status(200).json({ message: "success", page: "register page" });
    return;
  };


const postRegister = async (req, res) => {
  try {
    if (!req.file || !req.file.filename) {
      res.status(400).json({ mission: "failed", message: "image not found" });
      return;
    }

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res
        .status(400)
        .json({ mission: "failed", message: "some Credentials is null" });
      return;
    }

    const findUser = await userModel.findOne({ email });
    if (findUser) {
      res
        .status(409)
        .json({ mission: "failed", message: "User already exists" });
      return;
    }

    //add a user into the data-base:
    let passwordHash = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      name: name,
      email: email,
      password: passwordHash,
      image: {
        data: req.file.filename,
        contentType: "image/png",
      },
    });

    await newUser.save();

    res
      .status(200)
      .json({ "mission": "successful", "message": "New user Added successfully", });
      
  } catch (err) {
    res.status(500).json({
      mission: "failed",
      message: "internal server ",
      error: err.message,
    });
  }
};


const getLogin=(req, res) => {
    res
      .status(200)
      .json({ mission: "success", message: "welcome to login page" });
    return;
  };


const postLogin=async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
      res
        .status(400)
        .json({ mission: "failed", message: "one of credential is null" });
      return;
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(404).json({ mission: "failed", message: "user not found" });
      return;
    }

    const token = generateToken(user);

    res
      .status(200)
      .json({ 
        mission: "successful", 
        message: "user login successful",
        "token":token,
        "user":user 
      });

    return;
    
  } catch (err) {
    res
      .status(500)
      .json({ mission: "failed", message: "Server error", error: er });
    return;
  }
};


const getHome=(req, res) => {
    res.status(200).json({ mission: "success", message: "welcome to home page" });
    return;
  };


const getProfilePage=(req, res) => {
    res
      .status(200)
      .json({ mission: "success", message: "welcome to Profile page" });
    return;
  };

const profilePageChangeImage =async (req, res) => {
    try {
      if (!req.file || !req.file.filename) {
        res.status(400).json({ mission: "failed", message: "image not found" });
        return;
      }

      const { email } = req.body;

      if (!email) {
        res.status(400).json({ mission: "failed", message: "email not found" });
        return;
      }

      const updateUser = await userModel.findOneAndUpdate(
        { email: email },
        {
          $set: {
            "image.data": req.file.filename,
            "image.contentType": "image/png",
          },
        },
        { new: true, runValidators: true }
      );

      if (!updateUser) {
        res
          .status(400)
          .json({
            mission: "failure",
            message: "user not found so not updated",
          });
      }

      res
        .status(200)
        .json({ mission: "success", message: "image changed successfully",data:req.file.filename,user:updateUser });
      
        return;

    } catch (err) {
      res
        .status(200)
        .json({
          mission: "failed",
          message: "Server error",
          error: err.message,
        });
      return;
    }
  }


module.exports = { 
    getRegister, 
    postRegister, 
    getLogin, 
    postLogin, 
    getHome, 
    getProfilePage, 
    profilePageChangeImage,
};