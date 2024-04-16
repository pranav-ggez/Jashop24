const express=require('express')
const router=express.Router()
const User=require('../Model/User')
const {body, validationResult}=require('express-validator')


router.post('/login', body("email").isEmail(), body("password").isLength({min:8}),async (req, res)=>{
   try{
      const error=validationResult(req)
      if(!error.isEmpty()){
         return res.status(400).json({errors:  error.array()})
      }  
      let email=req.body.email;
      let user = await User.findOne({"email":email});
      if(!user) return res.status(400).json({errors:  "User does not exist"})
    //   const pwdCompare=await bcrypt.compare(req.body.password, intern.password)
      if(req.body.password!=user.password) return res.json({errors:  "Incorrect Password"})
      const data={
         intern:{
            id:user.id,
            email:user.email,
            name:user.name
         }
      }
      return res.json({success: true, user:intern})
   }catch(err){
      console.log(err)
      return res.json({success: false})
   }
})

module.exports=router;