// ***********************************setup*************************************
const authModel=require("../model/auth.model");
const validationResult=require("express-validator").validationResult;

// ***********************************getSignup*************************************
exports.getSignup=(req,res,next)=>{
    res.render("signup",{Title:"Signup",error:req.flash("errorMsg"),myId:req.session.userId,
    friendRequests:req.friendRequests,pageTitle:"Signup"
});
}

// ***********************************postSignup*************************************
exports.postSignup=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
    {
        const errorsMsg=errors.errors.map(errorMsg=>{
            return errorMsg.msg
        })
        req.flash("errorMsg",errorsMsg);
        res.redirect("/signup");
        return;
    }
    const data={
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    }
    authModel.postSignup(data).then(()=>{
        res.redirect("/signin");
    }).catch(err=>{
        req.flash("errorMsg",err)
        res.redirect("/signup");
    })
}



// ***********************************getSignin*************************************
exports.getSignin=(req,res,next)=>{
    console.log(req.friendRequests)
    res.render("signin",{Title:"Signin",error:req.flash("errorMsg"),
    myId:req.session.userId,friendRequests:req.friendRequests,pageTitle:"Signin",
    });
}

// ***********************************postSignin*************************************
exports.postSignin=(req,res,next)=>{
    const data={
        email:req.body.email,
        password:req.body.password
    }
    authModel.postSignin(data).then(user=>{
        req.session.userId=String(user._id);
        req.session.username=user.username;
        req.session.image=user.image;
        console.log(req.session);
        res.redirect("/");
    }).catch(err=>{
        req.flash("errorMsg",err);
        res.redirect("/signin");
    })
}


// ***********************************logout*************************************
exports.logout=(req,res,next)=>{
    req.session.destroy();
    res.redirect("/signin");
}