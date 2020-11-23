// ***********************************setup*************************************
const userModel=require("../model/user.model").getFriends; 
const creategroupModel=require("../model/creategroup.model"); 
exports.creategroup=(req,res,next)=>{
    userModel(req.session.userId).then(friends=>{
        res.render("creategroup",{
            Title:"",
            pageTitle:"Create Group",
            myId:req.session.userId,
            friendRequests:req.friendRequests,
            friends:friends,
        });
    })  
}


// ***********************************post group*************************************
exports.postGroup=(req,res,next)=>{
    let friends=req.body.friends;
    let myId=req.session.userId;
    let data={
        name:req.body.name,
        image:req.file.filename,
    }
    if (Array.isArray(friends))
    {
        friends.push(myId);
        data.members=friends;
    }
    else
    {
        let friend=[friends];
        friend.push(myId);
        data.members=friend;
    }
    
    creategroupModel.createGroup(data).then(()=>{
        res.redirect("/groups")
    })
}


// ***********************************get groups*************************************
exports.getGroups=(req,res,next)=>{
    creategroupModel.getGroups(req.session.userId).then(groups=>{
        res.render("groups",{
            Title:"Groups",
            pageTitle:"Groups",
            myId:req.session.userId,
            friendRequests:req.friendRequests,
            groups:groups
        })
    }).catch(err=>{
        console.log(err);
    })
}