// ****************************setup*************************************
const chatId=document.getElementById("chatId").value;
const message=document.getElementById("message");
const sendBtn=document.getElementById("send");
const contentChatMsg=document.getElementById("content-chat-msg");
const videoBtn=document.getElementById("videoBtn");

// ****************************emit join chat*************************************
socket.emit("joinChat",chatId);


// ****************************emit send message*************************************
sendBtn.onclick=_=>{
    const content=message.value;
    if(content == "")
    {
        return;
    }
    socket.emit("sendMessage",{
        chat:chatId,
        content:content,
        sender:myId
    },
    ()=>{
        message.value="";
    }
    )
}


// ****************************listen new  message*************************************
socket.on("newMessage",msg=>{
    let contentMsg="<div class='content-msg'>"
    if(msg.sender == myId)
    {
        contentMsg+=`
        <span class="myMsg">${msg.content}</span>
        </div>
        `
    }
    else
    {
        contentMsg+=`
        <span class="friendMsg">${msg.content}</span>
        </div>
        `
    }
    contentChatMsg.innerHTML+=contentMsg;
    contentChatMsg.scrollTo(0,contentChatMsg.scrollHeight);
})


// ****************************scroll down chat*************************************
window.onload=()=>{
    contentChatMsg.scrollTo(0,contentChatMsg.scrollHeight)
}




  