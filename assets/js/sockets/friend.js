// ****************************emit send message*************************************
const myUsername=document.getElementById("myUsername").value;
const myImage=document.getElementById("myImage").value;
const friendUserId=document.getElementById("friendUserId").value;
const friendUsername=document.getElementById("friendUsername").value;
const friendUserImage=document.getElementById("friendUserImage").value;
const friendRequests=document.getElementById("friendRequests").value;
const addFriendBtn=document.getElementById("addFriendBtn");

// ****************************emit friend requests*************************************
addFriendBtn.onclick=(e)=>{
    e.preventDefault();
    socket.emit("sendFriendRequest",{
        myId,
        myUsername,
        myImage,
        friendUserId,
        friendUsername,
        friendUserImage,
        addFriendBtn,
    })
}

// ****************************listen requests sent *************************************
socket.on("requestSent",()=>{
    addFriendBtn.remove();
    const formProfile=document.getElementById("form-profile");
    formProfile.innerHTML+=`
    <input type="submit" value="Cancel Request" class="btn btn-danger" formaction="/friend/cancel">
    `
})
