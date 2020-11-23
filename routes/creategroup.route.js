// ***********************************setup*************************************
const router=require("express").Router();
const creategroupController=require("../controller/creategroup.Controller");
const authGuard=require("./guard/auth.guard");
const multer=require("multer");

// ***********************************disk storage*************************************
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images");
    },
    filename:(req,file,cb)=>{
        cb(null,new Date().toDateString()+file.originalname);
    }
})

// ***********************************get create group*************************************
router.get("/creategroup",authGuard.isNotSignin,creategroupController.creategroup);

// ***********************************post group*************************************
router.post("/group",authGuard.isNotSignin,multer({storage:storage}).single("image"),
creategroupController.postGroup);

// ***********************************get groups*************************************
router.get("/groups",authGuard.isNotSignin,creategroupController.getGroups);


module.exports=router;