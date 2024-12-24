const mongoose = require("mongoose");
const express=require("express")

mongoose.connect("mongo url")
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

// A= CLIENT

// B= SERVER

// The flow:

// 1) A - B: Client sends username and password

// 2) B: Server checks them against DB records and if they match it creates; first, 
// signature using: base64UrlEncode(header).base64Url(payload), #secret# and then token using: signature.payload.secret

//3) A <- B: Server sends back token to client

//4) A->B: Client sends request to access certain URL with token in header

//5) B: Server decodes header and payload, uses #secret# to create another digital 
// signature and compares it with what was sent in to ensure integrity