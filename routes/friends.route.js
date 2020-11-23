// ***********************************setup*************************************
const router=require("express").Router();
const authGuard=require("./guard/auth.guard");
const friendsController=require("../controller/friends.controller").getFriends;

// ***********************************get friends*************************************
router.get("/",authGuard.isNotSignin,friendsController);





module.exports=router;
