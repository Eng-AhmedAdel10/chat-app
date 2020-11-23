// ***********************************setup*************************************
const userModel=require("../model/user.model").getFriends;


// ***********************************get friends*************************************
exports.getFriends=(req,res,next)=>{
    userModel(req.session.userId).then(friends=>{
        res.render("friends",{
            pageTitle:"Friends",
            Title:"Friends",
            myId:req.session.userId,
            friendRequests:req.friendRequests,
            friends:friends,
        })
    })
}

