const router = require('express').Router();
const Category = require('../model/category')
const verify=require('../middleware/verifyToken')

router.post('/addCategory',verify,async (req, res) => {

    const category=new Category({
        name:req.body.name,
        description:req.body.description,
    })

    // existing category validation
    const categoryExist = await Category.findOne({
        name:req.body.name,
    })
    if(categoryExist)return res.status(400).send('Category is Exist!')

    try{
        const saveCategory=await category.save()
        res.status(200).send(saveCategory)
    }catch (e) {
        console.log(e)
        res.status(400).send(e)
    }


})

module.exports = router;