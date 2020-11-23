// ***********************************setup*************************************
const userModel=require("../model/user.model");

// ***********************************io*************************************
module.exports=io=>{
    io.on("connection",socket=>{
        socket.on("sendFriendRequest",data=>{
            userModel.sendFrindRequest(data).then(()=>{
                return userModel.getFriendRequests(data.friendUserId)
            }).then(requests=>{
                io.to(data.friendUserId).emit("newFriendRequest",
            {name:data.myUsername,id:data.myId,requests:requests});
            socket.emit("requestSent");
            }).catch(err=>{
                socket.emit("requestFailed");
            })
        });

        socket.on("getOnlineFriends",id=>{
            userModel.getFriends(id).then(friends=>{
                let onlineFriends=friends.friends.filter(friend=>io.onlineUsers[friend.id]==true);
                socket.emit("onlineFriends",onlineFriends);
                console.log(friends);
            }).catch(err=>{
                console.log(err);
            })
        })
    })
}