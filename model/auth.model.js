// **********************************setup*************************************
const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const URL="mongodb+srv://ahmed:80080800@cluster0.qwa0g.mongodb.net/chat-app?retryWrites=true&w=majority";
const User=require("./user.model").User;


// **********************************postSignup*************************************
exports.postSignup=(data)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(URL).then(()=>{
            return User.findOne({email:data.email})
    }).then(user=>{
        if(user){
            mongoose.disconnect();
            reject("this email is already exist");
        }
        else
        {
            return bcrypt.hash(data.password,10);
        }
    }).then(hashPassword=>{
        const user=new User({
            username:data.username,
            email:data.email,
            password:hashPassword,
        });
        return user.save()
    }).then(()=>{
        mongoose.disconnect();
        resolve();
    }).catch(err=>{
        mongoose.disconnect();
        reject(err);
    })
})
}


// **********************************postSignin**********************************
exports.postSignin=(data)=>{
    return new Promise((resolve,reject)=>{
        let userG;
        mongoose.connect(URL).then(_=>{
            return User.findOne({email:data.email})
        }).then(user=>{
            userG=user;
            if(!user){
                mongoose.disconnect();
                reject("your email is not exist");
                return;
            }
            return bcrypt.compare(data.password,user.password)
        }).then(pass=>{
            if(!pass)
            {
                mongoose.disconnect();
                reject("password is not correct");
                return;
            }
            mongoose.disconnect();
            resolve(userG);
        }).catch(err=>{
            mongoose.disconnect();
            reject(err);
        })
    })
}