import express from 'express'
import { authorize, protect } from '../middlewares/logger.js';
const router=express.Router();

router.get('/dashboard',protect, authorize("admin"), (req,res)=>{
    res.json({message:`welcom to the admin dashbaord, ${req.user.name}`})
})
export default router