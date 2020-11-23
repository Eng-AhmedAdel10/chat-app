// ***********************************setup*************************************
module.exports=io=>{
    io.on("connection",socket=>{
        socket.on("joinRoomNotification",id=>{
            socket.join(id);
            console.log("joind ",id);
        })

    socket.on("goOnline",id=>{
        io.onlineUsers[id]=true;
        console.log(io.onlineUsers);
        
    socket.on("disconnect",()=>{
        io.onlineUsers[id]=false;
        console.log(io.onlineUsers);
    })
});
});
}