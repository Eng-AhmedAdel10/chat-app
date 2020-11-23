// ****************************************setup********************************************
const groupId=document.getElementById("groupId").value;
const messageGroup=document.getElementById("messageGroup");
const sendGroup=document.getElementById("sendGroup");
const contentGroupMsg=document.getElementById("content-group-msg");


// ****************************emit join group*************************************
socket.emit("joinGroup",groupId);


// ****************************emit send message group*************************************
sendGroup.onclick=()=>{
    let content=messageGroup.value;
    const data={
        sender:myId,
        content:content,
        groupId:groupId,
    }
    socket.emit("sendMessageGroup",data,()=>{
        messageGroup.value="";
})};


// ****************************listen new message group*************************************
socket.on("newMessageGroup",data=>{
    if(data.sender == myId)
    {
        contentGroupMsg.innerHTML+=`
        <div class="content-msg">
            <span class="myMsg">${data.content}</span>
        </div>
        `
    }
    else
    {
        contentGroupMsg.innerHTML+=`
        <div class="content-msg">
            <span class="friendMsg">${data.content}</span>
        </div>
        ` 
    }
})