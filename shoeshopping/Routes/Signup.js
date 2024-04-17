const express=require('express')
const router=express.Router()
const User=require('../Model/User')
const {body, validationResult}=require('express-validator')
router.post('/signup',  body("email").isEmail(), body("password").isLength({min:2}),  async (req, res)=>{
   const error=validationResult(req)
   console.log(req.body)
   if(!error.isEmpty()){
      console.log(error.array())
      return res.status(400).json({errors:  error.array()})
   }  

     try{
        await User.create({
            name:req.body.name,
            password:req.body.password,
            email: req.body.email
        })
        console.log("User created")
        res.json({success: true})
     }catch(err){
        console.log(err)
        res.json({success: false})
     }
})

router.post('/internLogin', body("email").isEmail(), body("password").isLength({min:8}),async (req, res)=>{
   try{
      const error=validationResult(req)
      if(!error.isEmpty()){
         return res.status(400).json({errors:  error.array()})
      }  
      let email=req.body.email;
      let intern = await Intern.findOne({"email":email});
      if(!intern) return res.status(400).json({errors:  "User does not exist"})
      const pwdCompare=await bcrypt.compare(req.body.password, intern.password)
      if(!pwdCompare) return res.json({errors:  "Incorrect Password"})
      const data={
         intern:{
            id:intern.id
         }
      }
      return res.json({success: true, user:intern})
   }catch(err){
      console.log(err)
      return res.json({success: false})
   }
})

module.exports=router;