// *************************************isSignin**********************************
exports.isSignin=(req,res,next)=>{
    if(req.session.userId)
    {
        res.redirect("/");
    }
    else
    {
        next();
    }
}


// *************************************isNotSignin**********************************
exports.isNotSignin=(req,res,next)=>{
    if(req.session.userId)
    {
        next();
    }
    else
    {
        res.redirect("/signin");
    }
}