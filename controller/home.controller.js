// ***********************************get home*************************************
exports.gethome=(req,res,next)=>{
    res.render("home",{pageTitle:"Home",Title:"Home",
    myId:req.session.userId,friendRequests:req.friendRequests});
}