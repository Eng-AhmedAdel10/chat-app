// ***********************************setup*************************************
const mongoose=require("mongoose");
const URL="mongodb+srv://ahmed:80080800@cluster0.qwa0g.mongodb.net/chat-app?retryWrites=true&w=majority";

// ***********************************schema*************************************
const messageSchema=mongoose.Schema({
    chat:{type:mongoose.Schema.Types.ObjectId,ref:"chat"},
    content:String,
    sender:String,
    timestamp:Number
});
const Message=mongoose.model("message",messageSchema);


// ***********************************get message*************************************
exports.getMessage= async chatId=>{
    try {
        await mongoose.connect(URL);
        let messages=await Message.find({chat:chatId}).populate({
            path:"chat",
            model:"chat",
            populate:{
                path:"users",
                model:"user",
                select:"username image"
            }
        })
        mongoose.disconnect();
        return messages;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }    
}


// ***********************************send message*************************************
exports.sendMessage= async msg=>{
    try {
        await mongoose.connect(URL);
        msg.timestamp= Date.now();
        const newMsg= await new Message(msg);
        await newMsg.save();
        mongoose.disconnect();
        return;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}