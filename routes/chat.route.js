// ***********************************setup*************************************
const router=require("express").Router();
const chatController=require("../controller/chat.controller");
const authGuard=require("./guard/auth.guard");


// ***********************************get chat*************************************
router.get("/:id",authGuard.isNotSignin,chatController.getChat);





module.exports=router;