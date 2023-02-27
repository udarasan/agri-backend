const router = require('express').Router();
const User = require('../model/user')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const verify=require('../middleware/verifyToken')




router.post('/register',async (req, res) => {

    const user=new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
    })

    // existing email validation
    const emailExist = await User.findOne({
        email:req.body.email
    })
    if(emailExist)return res.status(400).send('Email is Exist!')

    try{
        const saveUser=await user.save()
        res.status(200).send(saveUser)
    }catch (e) {
        console.log(e)
        res.status(400).send(e)
    }


})


router.post('/login', async (req, res) => {

    try {
        const user=new User({
            name:req.body.name,
            email:req.body.email,
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

        if(!emailExist)return res.status(400).send('Wrong Email Address!')
        if(!passwordExist)return res.status(400).send('Wrong Password!')

        //create and assign jwt token
        const token=jwt.sign({_id:user._id},process.env.JWT_TOKEN);
        res.status(200).send({
            "token":token
        })


    }catch (e) {
        res.status(500).send('Internal Server Error!')
    }



})

module.exports = router;

