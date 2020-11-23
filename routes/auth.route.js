// ***********************************setup*************************************
const router=require("express").Router();
const auth=require("../controller/auth.controller");
const bodyParser=require("body-parser");
const check=require("express-validator").check;
const authGuard=require("./guard/auth.guard");


// ***********************************get signup*************************************
router.get("/signup",authGuard.isSignin,auth.getSignup);

// ***********************************post signup*************************************
router.post("/signup",authGuard.isSignin,bodyParser.urlencoded({extended:true}),[
    check("username").not().isEmpty().withMessage("Please Enter your Username"),
    check("email").not().isEmpty().withMessage("Please Enter your Email"),
    check("email").isEmail().withMessage("Please Enter Valid Email"),
    check("password").isLength({min:6}).withMessage("Please Enter Password At Least 6 Char"),
    check("confirmPassword").custom((value,{req})=>{
        if(value !== req.body.password)
        {
            throw new Error("Password and confirm Password Is Not Matched")
        }
        else
        {
            return true;
        }
    })
],auth.postSignup);




// ***********************************get signin*************************************
router.get("/signin",authGuard.isSignin,auth.getSignin);

// ***********************************post signin*************************************
router.post("/signin",authGuard.isSignin,bodyParser.urlencoded({extended:true}),auth.postSignin);


// ***********************************logout*************************************
router.all("/logout",authGuard.isNotSignin,auth.logout)




module.exports=router;