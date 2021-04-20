const express = require('express')
const router = express.Router()

router.get('/signup',(req,res)=>{
    res.send("hello")
})
router.post('/signup',(req,res)=>{
    const {name, email, password} = req.body
    if(!email || !name || !password){
        return res.status(422).json({error:"Please provide all the required information"})
    }
    res.json({message:"Success"})
})
module.exports = router