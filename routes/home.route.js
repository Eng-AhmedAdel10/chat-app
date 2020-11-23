// *****************************setup*************************************
const router=require("express").Router();
const homeController=require("../controller/home.controller");
const authGuard=require("./guard/auth.guard");


// *****************************get home*************************************
router.get("/",authGuard.isNotSignin,homeController.gethome);






module.exports=router;
