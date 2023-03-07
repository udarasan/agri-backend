const router = require('express').Router();
const User = require('../model/user')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const verify=require('../middleware/verifyToken')




router.post('/register',async (req, res) => {

    const user=new User({
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
        password:req.body.password,
    })

    // existing email validation
    const emailExist = await User.findOne({
        email:req.body.email
    })
    if(emailExist)return res.status(400).send({
        "status":400,
        "message":"Email Is Exist",
        "content":null
    })

    try{
        const saveUser=await user.save()
        res.status(200).send({
            "status":200,
            "message":"Success",
            "content":saveUser
        })
    }catch (e) {
        console.log(e)
        res.status(500).send({
            "status":500,
            "message":"Internal Server Error",
            "content":e.message
        })
    }


})


router.post('/login', async (req, res) => {

    try {
        const user=new User({
            name:req.body.name,
            email:req.body.email,
            role:req.body.role,
            password:req.body.password,
        })

        // existing email validation
        const emailExist = await User.findOne({
            email:req.body.email
        })
        // password validation
        const passwordExist = await User.findOne({
            password:req.body.password
        })

        if(!emailExist)return res.status(400).send({
            "status":400,
            "message":"Wrong Email Address",
            "content":null
        })
        if(!passwordExist)return res.status(400).send({
            "status":400,
            "message":"Wrong Password",
            "content":null
        })

        //create and assign jwt token
        const token=jwt.sign({_id:user._id},process.env.JWT_TOKEN);
        res.status(200).send({
                "status":200,
                "message":"success",
                "content":token

        })


    }catch (e) {
        res.status(500).send( {
            "status":500,
            "message":"Internal Server Error",
            "content":null
        })
    }



})

module.exports = router;

