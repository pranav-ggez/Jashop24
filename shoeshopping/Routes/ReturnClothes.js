const express=require('express')
const router=express.Router()
router.post('/returnclothes', async (req, res)=>{

    try{
        console.log(global.clothes)
        res.send(global.clothes)
    }catch(err) {console.log(err.message)
    res.send("Server error")
    }
})
module.exports=router
