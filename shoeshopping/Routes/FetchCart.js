const express=require('express')
const router=express.Router()
const Cart=require('../Model/Cart')
const {body, validationResult}=require('express-validator')
router.post('/fetchcart',  async (req, res)=>{
   const error=validationResult(req)
   console.log(req.body)
   if(!error.isEmpty()){
      console.log(error.array())
      return res.status(400).json({errors:  error.array()})
   }  

     try{
        let cart=await Cart.findOne({email:req.body.email})
        console.log(cart)
        if(cart){
            res.json({cart: cart})
        }
        else{
            res.json({error: "No items in cart"})
        }
     }catch(err){
        console.log(err)
        res.json({success: false})
     }
})


module.exports=router;