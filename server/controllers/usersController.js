const { cleanCopy } = require("../functions/cleanCopy");
const {createToken} = require('../functions/createToken')
const UserModel = require("../models/user");
const bcrypt = require('bcryptjs');
//create user
module.exports.createUser = async(req,res) =>{
    const { firstname,lastname,email,password,profilePicture} = req.body;
    try{
        const user = await UserModel.findOne({email});
            if(user) return res.status(400).json("This email is already in use");
            const salt =await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt)
          const response =  await UserModel.create({
                firstname,
                lastname,
                email,
                password : hashedPassword,
                profilePicture

            });
            const copy = cleanCopy(response)
            return res.status(200).json(copy)
    }catch(err){
        res.status(500).json({message : err.message})
    }
}
// login user
module.exports.loginUser = async(req,res) =>{
    console.log("im here")
    const {email,password} = req.body;
    try{
        const user = await UserModel.findOne({email});
        if(!user) return res.status(400).json({message : "user does not exist"});
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid) return res.status(400).json({message : "Invalid Crendetials try again"})
        if(isPasswordValid){
        const token = createToken({
            email : email,
            id : user._id
        });
        res.cookie('token', token, {
            httpOnly : true,
            
        })
        const copy = cleanCopy(user)
        return res.status(200).json(copy);
        }
    }catch(err){
        res.status(500).json({message : err.message})
    }
}
//logout a user
module.exports.logoutUser= async (req,res) =>{
        res.clearCookie('token');
        res.status(200).json({message : 'Logged out successfully'})
}
//get a user profile
module.exports.Profile = async(req,res) =>{
    console.log(req.user);
    res.status(200).json(req.user)
}