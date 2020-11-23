// ***********************************setup*************************************
const mongoose=require("mongoose");
const URL="mongodb+srv://ahmed:80080800@cluster0.qwa0g.mongodb.net/chat-app?retryWrites=true&w=majority";

// ***********************************schema*************************************
const chatSchema=mongoose.Schema({
    users:[{type:mongoose.Schema.Types.ObjectId,ref:"user"}],
});
const Chat=mongoose.model("chat",chatSchema);
exports.chat=Chat;


// ***********************************get chat*************************************
exports.getChat=async chatId=>{
try {
    await mongoose.connect(URL);
    let chat= await Chat.findById(chatId).populate("users");
    mongoose.disconnect();
    return chat;
} catch (error) {
    mongoose.disconnect();
    throw new Error(error);
}
}