// ***********************************setup*************************************
const userModel=require("../model/user.model");






// ***********************************cancel friend request*************************************
exports.cancelFriendRequest=(req,res,next)=>{
    userModel.cancelFrindRequest(req.body).then(()=>{
        res.redirect("/profile/"+req.body.friendUserId);
    }).catch(err=>{
        next(err);
    })
}


// ***********************************accept friend request*************************************
exports.acceptFriendRequest=(req,res,next)=>{
    userModel.acceptFrindRequest(req.body).then(()=>{
            res.redirect("/profile/"+req.body.friendUserId);
    }).catch(err=>{
        next(err);
    })
}


// ***********************************reject friend request*************************************
exports.rejectFriendRequest=(req,res,next)=>{
    userModel.rejectFrindRequest(req.body).then(()=>{
        res.redirect("/profile/"+req.body.friendUserId);
    }).catch(err=>{
        next(err);
})
}


// ***********************************delete friend request*************************************
exports.deleteFriend=(req,res,next)=>{
    console.log(req.body);
    userModel.deleteFriend(req.body).then(()=>{
        res.redirect("/profile/"+req.body.friendUserId);
    }).catch(err=>{
        next(err);
    })
}

