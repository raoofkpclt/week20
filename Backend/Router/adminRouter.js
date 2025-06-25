
const express =  require("express");
const router = express.Router();
const adminController = require("../Controller/adminController"); 
const upload = require("../Multer/multerImage");


router.get("/login", adminController.getLogin);

router.post("/login",adminController.postLogin);

router.get("/dashboard",adminController.getDashBoard);

router.post("/dashboard",adminController.postDashBoard)


// searching => do'n FRONTEND:

router.get("/clearDB",adminController.clearDB);

router.post("/edit",upload.single("image"),adminController.edit);

router.post("/addAnUser",upload.single("image") ,adminController.addNewUser);

router.delete("/removeUser/:email",adminController.deleteAUser);

module.exports = router;
