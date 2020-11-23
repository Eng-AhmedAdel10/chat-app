// ***********************************setup*************************************
const messageModel=require("../model/message.model");
const chatModel=require("../model/chat.model");


// ***********************************get chat*************************************
exports.getChat=(req,res,next)=>{
    const id=req.params.id;
    messageModel.getMessage(id).then(messages=>{
        if(messages.length === 0)
        {
            chatModel.getChat(id).then(chat=>{
            let friendData=chat.users.find(friend=>friend._id != req.session.userId);
            
            res.render("chat",{
                Title:"Home",
                myId:req.session.userId,
                friendRequests:req.friendRequests,
                pageTitle:friendData.username,
                friendData:friendData,
                messages:messages,
                chatId:id,
                myUsername:req.session.username,
                myImage:req.session.image
            });
            })
        }else
        {
            let friendData=messages[0].chat.users.find(friend=> friend._id != req.session.userId );
            
            res.render("chat",{
                Title:"",
                myId:req.session.userId,
                friendRequests:req.friendRequests,
                pageTitle:friendData.username,
                friendData:friendData,
                messages:messages,
                chatId:id,
                myUsername:req.session.username,
                myImage:req.session.image
        });
    }
    }).catch(err=>{
        console.log(err);
    })
} 