// *************************************setup******************************************
const mongoose=require("mongoose");
const URL="mongodb+srv://ahmed:80080800@cluster0.qwa0g.mongodb.net/chat-app?retryWrites=true&w=majority";
const Chat=require("./chat.model").chat;

// *************************************userSchema******************************************
const userSchema=mongoose.Schema({
    username:String,
    email:String,
    password:String,
    image:{type:String,default:"default-profile.png"},
    isOnline:{type:Boolean,default:false},

    friends:{type:[{name:String,image:String,
        id:{type:mongoose.Schema.Types.ObjectId,ref:"user"},chat:String}],default:[]},
        
    friendRequests:{type:[{name:String,id:String}],default:[]},
    sentRequests:{type:[{name:String,id:String}],default:[]}
});
const User=mongoose.model("user",userSchema);

exports.User=User;

// *************************************userData******************************************
exports.getUserData=(id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(URL).then(()=>{
            return User.findById(id);
        }).then(user=>{
            mongoose.disconnect();
            resolve(user);
        }).catch(err=>{
            mongoose.disconnect();
            reject(err);
        })
    })
}


// ***********************************add friend request*************************************
exports.sendFrindRequest=async(data)=>{
    try
    {
        await mongoose.connect(URL);
        await User.updateOne({_id:data.friendUserId},{$push:{friendRequests:{name:data.myUsername,id:data.myId}}})
        await User.updateOne({_id:data.myId},{$push:{sentRequests:{name:data.friendUsername,id:data.friendUserId}}})
        mongoose.disconnect();
        return;
    }
    catch(error)
    {
        mongoose.disconnect();
        throw new Error(error);
    }
}



// ***********************************cancel friend request*************************************
exports.cancelFrindRequest=async(data)=>{
    try
    {
        await mongoose.connect(URL);
        await User.updateOne({_id:data.friendUserId},{$pull:{friendRequests:{id:data.myId}}})
        await User.updateOne({_id:data.myId},{$pull:{sentRequests:{id:data.friendUserId}}})
        mongoose.disconnect();
        return;
    }
    catch(error)
    {
        mongoose.disconnect();
        throw new Error(error);
    }
}


// ***********************************accept friend request*************************************
exports.acceptFrindRequest=async(data)=>{
    try
    {
        await mongoose.connect(URL);
        const newChat= new Chat({
            users:[data.myId,data.friendUserId]
        })
        const chat= await newChat.save();
        await User.updateOne({_id:data.myId},{$pull:{friendRequests:{id:data.friendUserId}}}); 
        await User.updateOne({_id:data.friendUserId},{$pull:{sentRequests:{id:data.myId}}});
        await User.updateOne({_id:data.myId},
            {$push:{friends:{id:data.friendUserId,name:data.friendUsername,
                image:data.friendUserImage,chat:chat._id}}});
        await User.updateOne({_id:data.friendUserId},
            {$push:{friends:{id:data.myId,name:data.myUsername,
                image:data.myImage,chat:chat._id}}});
            mongoose.disconnect();
        return;
    }
    catch(error)
    {
        mongoose.disconnect();
        throw new Error(error);
    }

}


// ***********************************reject friend request*************************************
exports.rejectFrindRequest=async(data)=>{
    try {
        await mongoose.connect(URL);
        await User.updateOne({_id:data.myId},{$pull:{friendRequests:{id:data.friendUserId}}}); 
        await User.updateOne({_id:data.friendUserId},{$pull:{sentRequests:{id:data.myId}}});
    } 
    catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}


// ***********************************delete friend request*************************************
exports.deleteFriend=async(data)=>{
    try
    {
        await mongoose.connect(URL);
        await User.updateOne({_id:data.myId},{$pull:{friends:{id:data.friendUserId}}}); 
        await User.updateOne({_id:data.friendUserId},{$pull:{friends:{id:data.myId}}});
        mongoose.disconnect();
        return;
    }
    catch(error)
    {
        mongoose.disconnect();
        throw new Error(error);
    }
}


// ***********************************get friend request*************************************
exports.getFriendRequests=async(id)=>{
    try 
    {
        await mongoose.connect(URL);
        let friendRequests=await User.findById(id,{friendRequests:true});
        mongoose.disconnect();
        return friendRequests;
    } 
    catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}


// ***********************************get friends*************************************
exports.getFriends=async(id)=>{
    try 
    {
        await mongoose.connect(URL);
        let friends=await (await User.findById(id,"friends"));
        mongoose.disconnect();
        return friends;
    } 
    catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}



// ***********************************get users search*************************************
exports.getUsersSearch= async(name)=>{
    try {
        await mongoose.connect(URL);
        let users=await User.find({username:name},"username image")
        mongoose.disconnect();
        return users;
    } catch (error) {
        mongoose.disconnect();
        return error;
    }
}


// ***********************************get users search*************************************
exports.updateImg=async(data)=>{
    try {
        await mongoose.connect(URL);
        await User.updateOne({_id:data.id},{image:data.image});
        mongoose.disconnect();
        return;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
    
}







