// ***********************************setup*************************************
const messageModel=require("../model/message.model").sendMessage;


// ***********************************io*************************************
module.exports=io=>{
    io.on("connection",socket=>{
        socket.on("joinChat",chatId=>{
            socket.join(chatId);
        });

        socket.on("sendMessage",(msg,cb)=>{
            messageModel(msg).then(()=>{
                io.to(msg.chat).emit("newMessage",msg);
                cb();
            })
            
        });



    })
}