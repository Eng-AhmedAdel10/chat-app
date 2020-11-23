// ***********************************setup*************************************
const MessageGroupModel=require("../model/messages.group.model").sendMessageGroup;


// ***********************************io*************************************
module.exports=io=>{
    io.on("connection",socket=>{
        socket.on("joinGroup",groupId=>{
            socket.join(groupId);
            console.log("joined ",groupId);
        })

        socket.on("sendMessageGroup",(data,cb)=>{
            MessageGroupModel(data).then(()=>{
                io.to(data.groupId).emit("newMessageGroup",data);
                cb();
            });

        })

    })
};