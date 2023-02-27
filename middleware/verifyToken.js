const jwt=require('jsonwebtoken')

 module.exports=function auth(req,res,next) {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        if (!token) return res.status(401).send('Access Denied');

        try{
            const verified=jwt.verify(token,process.env.JWT_TOKEN);
            req.user=verified;
            next()
        }catch (e) {
            res.status(400).send('Invalid Token');
        }
    }catch (e) {
        res.status(400).send('Unauthorized Action');
    }


 }