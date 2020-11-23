// ***********************************setup*************************************
const chatgroupModel=require("../model/messages.group.model"); 
const creategroupModel=require("../model/creategroup.model"); 

// ***********************************get chat group*************************************
exports.getChatGroup=(req,res,next)=>{
    const id=req.params.id;
    chatgroupModel.getChatGroup(id).then(msg=>{
        if(msg.length == 0)
        {
            creategroupModel.getGroupdata(id).then(data=>{
                res.render("chat_group",{
                    myId:req.session.userId,
                    Title:"",
                    pageTitle:data.name,
                    friendRequests:req.friendRequests,
                    groupId:id,
                    groupName:data.name,
                    groupImage:data.image,
                    members:data.members,
                    messages:msg,
                })
            })
        }
        else
        {
            res.render("chat_group",{
                myId:req.session.userId,
                Title:"",
                pageTitle:msg[0].groupId.name,
                friendRequests:req.friendRequests,
                groupId:id,
                groupName:msg[0].groupId.name,
                groupImage:msg[0].groupId.image,
                messages:msg,
                members:msg[0].groupId.members,
            })
        }
        
    })
}