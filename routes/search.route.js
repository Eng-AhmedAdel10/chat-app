// ***********************************setup**********************************
const router=require("express").Router();
const authGuard=require("./guard/auth.guard");
const searchController=require("../controller/search.controller");

// ***********************************search*************************************
router.get("/",authGuard.isNotSignin,searchController.getUsers);





module.exports=router;