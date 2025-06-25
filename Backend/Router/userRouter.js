const express = require("express");
const router = express.Router();
const upload = require("../Multer/multerImage");
const userControl = require("../Controller/userController");


router.get("/register", userControl.getRegister);

router.post("/register",upload.single("image"),userControl.postRegister);

router.get("/login", userControl.getLogin);

router.post("/postLogin", userControl.postLogin);

router.get("/home", userControl.getHome);

router.get("/home/profilePage", userControl.getProfilePage);

router.post( "/home/profilePage/changeImage",upload.single("image"),userControl.profilePageChangeImage)


module.exports = router;
