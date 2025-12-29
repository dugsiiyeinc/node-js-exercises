import jwt from 'jsonwebtoken'
import User from '../model/post.js';

export const logger=(req,res,next)=>{
    console.log(`[ ${new Date().toDateString()}] ${req.method} ${req.originalUrl}`);
    next();
}
export const notFound=(req,res,next)=>{
    const error=new Error(`Route ${req.originalUrl} not found`)
    error.statusCode=404;
    next(error)
}

export const errorHandler=(err,req,res,next)=>{
    const status=err.statusCode || 500;

    res.status(status).json({
        success:false,
        message:err.message || 'something went wrong',
        status
    })
}

export const protect=async (req,res,next)=>{

    const token=req.headers.authorization?.split(' ')[1];

    if(!token) return res.status(401).json({message:"No token provided."});

    try {
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        req.user=await User.findById(decode.id).select('-password')
        next()
    } catch (error) {
        res.status(401).json({message:"Invalid or expired token"})
    }
}

export const authorize=(...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                message:`Access denied: requires one of [${roles.join(',')}]`
            })
        }
        next()
    }
}