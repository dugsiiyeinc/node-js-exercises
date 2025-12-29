import express from 'express'
import { login, register } from '../controllers/auth.js';
import { protect } from '../middlewares/logger.js';
const router=express.Router();

router.post('/register',register)
router.post('/login',login)
router.get('/profile', protect, (req,res)=>{
    res.json(req.user);
})

export default router