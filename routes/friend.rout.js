// ***********************************setup*************************************
const router=require("express").Router();
const friendController=require("../controller/friend.controller");
const bodyParser=require("body-parser").urlencoded({extended:true});
const authGuard=require("./guard/auth.guard");





// ***********************************cancel friend request*************************************
router.post("/cancel",authGuard.isNotSignin,bodyParser,friendController.cancelFriendRequest);


// ***********************************accept friend request*************************************
router.post("/accept",authGuard.isNotSignin,bodyParser,friendController.acceptFriendRequest);


// ***********************************reject friend request*************************************
router.post("/reject",authGuard.isNotSignin,bodyParser,friendController.rejectFriendRequest);


// ***********************************delete friend request*************************************
router.post("/delete",authGuard.isNotSignin,bodyParser,friendController.deleteFriend);




module.exports=router;