const mongoose = require("mongoose");
const express=require("express")

mongoose.connect("mongodb+srv://admin:moshinaat123@cluster0.a6sak.mongodb.net/user_app?retryWrites=true&w=majority&appName=Cluster0")
const User = mongoose.model('Users', {name:String, email:String,password:String});
const app=express();
app.use(express.json())
app.post("/signup", async function(req,res){
    const username =req.body.username;
    const password= req.body.password
    const name = req.body.name;
    const existingUser=await User.findOne({email:username})
    if(existingUser){
        return res.status(400).send("username alredy exist");
    }
    const user = new User({
        name:name,
        email:username,
        password:password
    })
    user.save();
    res.json({
        "msg":"User Created succesfully"
    })
})
app.listen(3000);