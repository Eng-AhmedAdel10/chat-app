// ***********************************setup*************************************
const mongoose=require("mongoose");
const URL="mongodb+srv://ahmed:80080800@cluster0.qwa0g.mongodb.net/chat-app?retryWrites=true&w=majority";

// ***********************************schema*************************************
const messageSchema=mongoose.Schema({
    groupId:{type:mongoose.Schema.Types.ObjectId,ref:"group"},
    content:String,
    sender:String,
    timestamp:Number
});
const MessageGroup=mongoose.model("messagesGroup",messageSchema);

// ***********************************get chat group*************************************
exports.getChatGroup=async (id)=>{
    try {
        await mongoose.connect(URL);
        const groupData=await MessageGroup.find({groupId:id}).populate({
            path:"groupId",
            populate:{
            path:"members",
            model:"user",
            select:"username image",
        }
    });
        mongoose.disconnect();
        return groupData;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

// ***********************************send message group*************************************
exports.sendMessageGroup= async msg=>{
    try {
        await mongoose.connect(URL);
        msg.timestamp=Date.now();
        const newMsg= await new MessageGroup(msg);
        await newMsg.save();
        mongoose.disconnect();
        return;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}