// *******************************setup**************************************************
const userModel=require("../model/user.model");
const fs=require("fs");

// *friends
//      user1 in user2 friends
// *user1 send friend request to user2
//       use1 in user2 friendRequest
// *user1 recieve friend request from user2
//       use1 in user2 sentRequest



// **************************************getProfile*******************************************
exports.getProfile=(req,res,next)=>{
    const id=req.params.id;
    if(!id) return res.redirect("/profile/"+req.session.userId);

    userModel.getUserData(id).then(user=>{
        res.render("profile",{Title:"profile",
        friendRequests:req.friendRequests,
        myId:req.session.userId,
        myUsername:req.session.username,
        myImage:req.session.image,
        userId:user._id,
        username:user.username,
        userImage:user.image,
        pageTitle:user.username,
        isOwner: id === req.session.userId,
        isFriends:user.friends.find(friend=>friend.id == req.session.userId),
        isFriendSent:user.friendRequests.find(friend=>friend.id === req.session.userId),
        isFriendreceived:user.sentRequests.find(friend=>friend.id === req.session.userId)
    })
    }).catch(err=>{
        next(err);
    })
}


// **************************************update img*******************************************
exports.updateImg=(req,res,next)=>{
    const imgPath="./images/"+req.session.image;
    if(req.session.image.endsWith("default-profile.png",19))
    {
        updateImg();
    }
    else
    {
    fs.unlink(imgPath,err=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            updateImg();
        }
    })
    
}

function updateImg()
{
    const data={id:req.session.userId,image:req.file.filename};
            userModel.updateImg(data).then(()=>{
                res.redirect("/profile/"+req.session.userId);
            }).catch(err=>{
                console.log(err);
            })
}
}