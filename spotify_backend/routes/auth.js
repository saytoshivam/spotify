const bcrypt = require("bcrypt");
const {getToken} = require("../extensions/authExtention");

const express = require("express");
const router = express.Router();
const User = require("../model/User");

router.post("/register",async (req,res)=>{
    const {email,password,firstName,lastName,userName} = req.body;

    const user = await User.findOne({email:email});
    if(user){
        return res.status(403).json({error:"a user with this email already exists"});
    }

    const hashedPassword = bcrypt.hash(password,10);
    const newUserData = {email,password:hashedPassword,firstName,lastName,userName}; 
    const newUser = await User.create(newUserData);
    const token = await getToken(email,newUser);

    const userToReturn = {...newUser.toJSON(),"token":token};
    delete userToReturn.password;
    return res.status(200).send(userToReturn);
});
router.get("/getUsers",async (req,res) => {
    const users = await User.find({});
    return res.status(200).json({data : users} );
});

module.exports = router;