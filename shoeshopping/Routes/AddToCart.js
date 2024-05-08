const express=require('express')
const router=express.Router()
const Cart=require('../Model/Cart')
const {body, validationResult}=require('express-validator')
router.post('/AddToCart',  async (req, res)=>{
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
            let clothes=await fetch('http://localhost:3000/api/returnclothes', {
               method: "POST",
             headers: {
               "Content-Type": "application/json",
             },
               body: JSON.stringify({
                 name: req.body.name,
                 email: req.body.email,
               }),
             })
            clothes =await clothes.json()
            console.log(clothes)
            console.log(clothes[req.body.id-1])
            let newItem=JSON.parse(JSON.stringify(clothes[req.body.id-1]))
            console.log("ssdds   \n", newItem)
            cart.cartItems.push(newItem)
            console.log("ggggg", cart.cartItems)
            await Cart.updateOne(
               { name: req.body.name, email: req.body.email },
               { $set: { cartItems: cart.cartItems } }
             );
            console.log("User created")
            res.json({success: true})
        }
        else{
            await Cart.create({
                name:req.body.name,
                email: req.body.email,
                cartItems: [global.clothes[req.body.id-1]]
            })
            console.log("User created")
            res.json({success: true})
        }
     }catch(err){
        console.log(err)
        res.json({success: false})
     }
})


module.exports=router;