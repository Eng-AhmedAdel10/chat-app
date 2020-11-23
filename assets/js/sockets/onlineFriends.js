// ****************************emit get online friends*************************************
socket.emit("getOnlineFriends",myId);

// ****************************listen online friends*************************************
socket.on("onlineFriends",friends=>{
    let content=document.getElementById("content");
    if(friends.length == 0)
    {
        content.innerHTML=`
        <div class="alert alert-danger text-center mt-3">No Online Friends</div>
        `
    }
    else
    {
        let row=`<div class="row mt-4">`;
        for(friend of friends )
        {
            row +=`
            <div class="col col-12 col-md-6 col-lg-4">
                <div class="card mb-3 cardChat">
                <div class="row no-gutters">
                <div class="col-5">
                    <img src="${friend.image}" class="card-img" alt="img">
                </div>
                <div class="col-7">
                    <div class="card-body">
                    <a href="/profile/${friend.id}" class="name">${friend.name}</a>
                    <a href="/chat/${friend.chat}" class="btn btn-success">Chat</a>
                
                </div>
                </div>
                </div>
                </div>
            </div>
            `
        }
        row+=`</div>`;
        content.innerHTML+=`
        <h2 class="bg-success text-center py-3 text-white">Online Friends</div>
        `
        content.innerHTML+=row;
    }
})