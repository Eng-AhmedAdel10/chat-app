// ***********************************setup*************************************
const userModer=require("../model/user.model");


// ***********************************get users*************************************
exports.getUsers=(req,res,next)=>{
    userModer.getUsersSearch(req.query.search).then(users=>{
        res.send(users);
    }).catch(err=>console.log(err));
}