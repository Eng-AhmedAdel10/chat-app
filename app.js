// ***********************************setup****************************************
const https=require("http");
const path=require("path");
const fs=require("fs");
const express=require("express");
const session=require("express-session");
const SessionStore=require("connect-mongodb-session")(session);
const flash=require("connect-flash");
const SocketIo=require("socket.io");
const app=express();


// ***********************************routes****************************************
const homeRouter=require("./routes/home.route");
const authRouter=require("./routes/auth.route");
const profileRouter=require("./routes/profile.route");
const friendRouter=require("./routes/friend.rout");
const userModel=require("./model/user.model");
const chatRouter=require("./routes/chat.route");
const friendsRouter=require("./routes/friends.route");
const creategroupRouter=require("./routes/creategroup.route");
const chatgroupRouter=require("./routes/chat.group.route");
const searchRouter=require("./routes/search.route");



// *********************************http server********************************************
const server=https.createServer(app);

// *********************************socket********************************************
const io=SocketIo(server);
require("./sockets/friend.socket")(io);
require("./sockets/init.socket")(io);
require("./sockets/chat.socket")(io);
require("./sockets/chat.group.socket")(io);
io.onlineUsers={}




// *********************************setting********************************************

app.use(express.static(path.join(__dirname,"assets")));
app.use(express.static(path.join(__dirname,"images")));

app.set("views","views");
app.set("view engine","ejs");


const store=new SessionStore({
    uri:"mongodb+srv://ahmed:80080800@cluster0.qwa0g.mongodb.net/chat-app?retryWrites=true&w=majority",
    collection:"sessions"
});

app.use(session({
    secret:"chat-app ? \ ! @ hash @ session",
    saveUninitialized:false,
    store:store
}));
app.use(flash());

app.use((req,res,next)=>{
    if(req.session.userId)
    {
        userModel.getFriendRequests(req.session.userId).then((friendRequests)=>{
            req.friendRequests=friendRequests.friendRequests;
            next();
        })
    }
    else
    {
        next();
    }
})

app.use("/",homeRouter);
app.use(authRouter);
app.use("/profile",profileRouter);
app.use("/friend",friendRouter);
app.use("/chat",chatRouter);
app.use("/friends",friendsRouter);
app.use(creategroupRouter);
app.use("/chatgroup",chatgroupRouter);
app.use("/search",searchRouter);
// ***********************************server****************************************
const port=process.env.PORT || 3000 ;
server.listen(port,()=>{
    console.log("server is running on port ",port);
})


module.exports=app;