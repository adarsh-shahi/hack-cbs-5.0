import express from 'express';
import * as authController from './../controllers/authController.js'
import AppError  from '../utils/appError.js';
import userProf from '../Models/userProf'

const router = express.Router();

router.patch('/users', authController.protect, async (req,res, next) => {
   const allowed = ['height', 'weight', 'birthDate','gender','bloodGroup' ]

   let userInput = []
   for (const key in req.body) {
      userInput.push(key);
  }

   const isValid = userInput.find(e => {
      return allowed.includes(e);
   })

   if(!isValid){
      return next(new AppError(400,' Other paramsters are not allowed'))
   }
   try{
      const user = await userProf.findOne({email}, req.body)
      res.status(201).json({
         status: success,
         data: user
      })
   }
   catch(e){
       next(new AppError(404,'User Not Found'));
   }

})

router.get('/users', authController.protect, async (req, res) => {

})


router.post('/signup', authController.signup)
router.post('/login', authController.login)

export default router;