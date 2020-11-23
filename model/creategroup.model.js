// ***********************************setup*************************************
const mongoose=require("mongoose");
const URL="mongodb+srv://ahmed:80080800@cluster0.qwa0g.mongodb.net/chat-app?retryWrites=true&w=majority";

// ***********************************schema*************************************
const groupSchema=mongoose.Schema({
    name:String,
    image:{type:String,default:"default-group"},
    members:[{type:mongoose.Schema.Types.ObjectId,ref:"user"}]
});
const Group=mongoose.model("group",groupSchema);


// ***********************************create group*************************************
exports.createGroup=async (data)=>{
    try {
        await mongoose.connect(URL);
        const newGroup=await new Group(data);
        await newGroup.save();
        mongoose.disconnect();
        return;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}


// ***********************************get groups*************************************
exports.getGroups=async (myId)=>{
    try {
        await mongoose.connect(URL);
        const groups= await Group.find({members:myId});
        mongoose.disconnect();
        return groups;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

// ***********************************get group data*************************************
exports.getGroupdata=async(id)=>{
    try {
        await mongoose.connect(URL);
        const groupData= await Group.findById(id).populate({
            path:"members",
            select:"image username"
        });
        mongoose.disconnect();
        return groupData;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}


exports.sendMessageGroup=(req,res,next)=>{
    
}