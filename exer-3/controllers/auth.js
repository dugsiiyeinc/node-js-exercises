import User from '../model/post.js'
import { generateToken } from "../utils/generateToken.js";

// real crud operation

export const register= async (req,res,next)=>{

    let {name, email,password, role}=req.body;

    try {
        email=email.toLowerCase();
        const exists=await  User.findOne({email});

        if(exists) return res.status(400).json({message:'Email already in use'});

        const user=await User.create({name,email,password,role})
        const token=generateToken(user._id)
        res.status(201).json({token})

    } catch (error) {
        console.log('error',error);
        next(error)
    }
}

export const login=async(req,res,next)=>{
    let {email,password}=req.body;

    try {
        email=email.toLowerCase();

        const user= await User.findOne({email});

        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({message:"Invalid email or password"})
        } 

        console.log("login info: ",user);
        const token=generateToken(user._id);
        res.json({token})
    } catch (error) {
        next(error)
    }
}