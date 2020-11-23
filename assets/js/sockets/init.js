// ****************************setup*************************************
const socket=io();
const myId=document.getElementById("myId").value;
const friendRequestsBtn=document.getElementById("friendRequests");

// ****************************listen connect*************************************
socket.on("connect",()=>{
    // emit room notification
    socket.emit("joinRoomNotification",myId);
    // emit go online
    socket.emit("goOnline",myId);
})

// ****************************listen new friend requests*************************************
socket.on("newFriendRequest",data=>{
    const friendRequestsMenu=document.getElementById("friendRequestsMenu");
    const span=friendRequestsMenu.querySelector("span");
    if(span) span.remove();
    friendRequestsMenu.innerHTML+=`
    <a class="dropdown-item" href="/profile/${data.id}">
            <i class="fa fa-user-plus" aria-hidden="true"></i> ${data.name}</a>
    `
    friendRequestsBtn.classList.remove("btn-primary");
    friendRequestsBtn.classList.add("btn-danger");
    const  badge=friendRequestsBtn.querySelector(".badge");
    badge.innerHTML=(data.requests.friendRequests.length);
})

// ****************************trigger function*************************************
friendRequestsBtn.onclick=_=>{
    friendRequestsBtn.classList.remove("btn-danger");
    friendRequestsBtn.classList.add("btn-primary");
}

