// ***********************************setup**********************************
const router=require("express").Router();
const authGuard=require("./guard/auth.guard");
const profileController=require("../controller/profile.controller");
const multer=require("multer");



// ***********************************get profile*************************************
router.get("/",authGuard.isNotSignin,profileController.getProfile);

router.get("/:id",authGuard.isNotSignin,profileController.getProfile);



// ***********************************diskStorage*************************************
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images");
    },
    filename:(req,file,cb)=>{
        cb(null,new Date().toDateString()+file.originalname);
    }
})


// ***********************************update Image*************************************
router.post("/updateImg",authGuard.isNotSignin,multer({storage:storage}).single("profileImg"),
profileController.updateImg)






module.exports=router;