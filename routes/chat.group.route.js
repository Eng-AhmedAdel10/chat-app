// ***********************************setup*************************************
const router=require("express").Router();
const chatGroupController=require("../controller/chat.group.controller");
const authGuard=require("./guard/auth.guard");


// ***********************************get chat group*************************************
router.get("/:id",authGuard.isNotSignin,chatGroupController.getChatGroup);





module.exports=router;